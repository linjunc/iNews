import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { throttle } from 'lodash'

import { skeletonHandlerHOC } from '../../../../utils/high-order-components'
import { getLikeList } from '../../../../services/user'
import { lazyLoad } from '../../../../utils/optimize-fn'

import { message, Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import NewsItem from '../news-item'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export default memo(function LikeNews() {
  const { id: user_id } = useParams()
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const [likeList, setLikeList] = useState([])
  const [skipNum, setSkipNum] = useState(0)
  // 记录现在是否已再发请求了，如果是的话，那么就不要继续发送
  const [isRequest, setIsRequest] = useState(false)
  const isRequestRef = useRef(false)
  const hasMoreRef = useRef(true)

  // 用户滑动到底部的时候请求更多的数据
  const requestMoreArticle = useCallback(
    throttle(
      lazyLoad(() => {
        isRequestRef.current || setSkipNum((skipNum) => skipNum + 10)
      }),
      200,
    ),
    [],
  )

  useEffect(() => {
    // 将isRequest的值改为true，表明现在正在发送请求
    setIsRequest((isRequestRef.current = true))
    const reqMore = async () => {
      try {
        const { data } = await getLikeList({
          user_id,
          n: 10,
          skip: skipNum,
        })
        setIsRequest((isRequestRef.current = false))
        // 如果数据已经没有更多了，则取消监听滚动事件，这样就不会继续发送请求了
        if (!data.has_more) {
          hasMoreRef.current = false
          window.removeEventListener('scroll', requestMoreArticle)
        }
        data.article_list &&
          setLikeList((article_list) => [...article_list, ...data.article_list])
      } catch (err) {
        message.error('请求失败，请刷新页面重试！')
      } finally {
        isSkeletonLoading && setIsSkeletonLoading(false)
      }
    }
    reqMore()
  }, [skipNum])

  // 监听页面滚动事件
  useEffect(() => {
    window.addEventListener('scroll', requestMoreArticle)
    return () => {
      window.removeEventListener('scroll', requestMoreArticle)
    }
  }, [])

  return (
    <div>
      {skeletonHandlerHOC(
        likeList.length ? (
          likeList.map((item) => {
            return <NewsItem key={item.article_id} newsInfo={item} />
          })
        ) : (
          <Empty description="暂时还没有点赞过新闻哦！" />
        ),
        { rows: 3 },
        isSkeletonLoading,
      )}
      {isRequest && !isSkeletonLoading && (
        <Spin indicator={antIcon} tip="加载中..." />
      )}
      {hasMoreRef.current ||
        (likeList.length > 10 && (
          <div className="toBottom middle-item">已经没有更多内容了哦！</div>
        ))}
    </div>
  )
})
