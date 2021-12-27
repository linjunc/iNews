import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { throttle } from 'lodash'

import { skeletonHandlerHOC } from '../../../../utils/high-order-components'
import { lazyLoad } from '../../../../utils/optimize-fn'

import { message, Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import NewsItem from '../news-item'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export default function NewsList(props) {
  // 获取发送请求的函数
  const { getNewsFn } = props
  const { id: user_id } = useParams()
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const [newsList, setNewsList] = useState([])
  const [skipNum, setSkipNum] = useState(0)
  const skipNumRef = useRef(0)
  // 记录现在是否已再发请求了，如果是的话，那么就不要继续发送
  const [isRequest, setIsRequest] = useState(false)
  // 判断时主要依靠useRef中的值，useState只负责让组件重新渲染，这样才能出现加载框
  const isRequestRef = useRef(false)
  const hasMoreRef = useRef(true)

  // 用户滑动到底部的时候请求更多的数据
  const requestMoreArticle = useCallback(
    throttle(
      lazyLoad(() => {
        isRequestRef.current ||
          setSkipNum((skipNum) => (skipNumRef.current = skipNum + 10))
      }),
      200,
    ),
    [],
  )

  // 初始化数据
  useEffect(() => {
    skipNum && setSkipNum(0)
    skipNumRef.current = 0
    isSkeletonLoading || setIsSkeletonLoading(true)
    newsList.length && setNewsList([])
    isRequest && setIsRequest(false)
    isRequestRef.current = false
    hasMoreRef.current = true
  }, [getNewsFn])

  useEffect(() => {
    // 将isRequest的值改为true，表明现在正在发送请求
    setIsRequest((isRequestRef.current = true))
    const reqMore = async () => {
      try {
        const { data } = await getNewsFn({
          user_id,
          n: 10,
          skip: skipNumRef.current,
        })
        setIsRequest((isRequestRef.current = false))
        // 如果数据已经没有更多了，则取消监听滚动事件，这样就不会继续发送请求了
        if (!data.has_more) {
          hasMoreRef.current = false
          window.removeEventListener('scroll', requestMoreArticle)
        }
        data.article_list &&
          setNewsList((article_list) => [...article_list, ...data.article_list])
      } catch (err) {
        message.error('请求失败，请刷新页面重试！')
      } finally {
        setIsSkeletonLoading(false)
      }
    }
    // 在没接收到响应之前不允许发送第二次请求
    isRequest || reqMore()
  }, [skipNumRef.current, getNewsFn])

  // 监听页面滚动事件
  useEffect(() => {
    window.addEventListener('scroll', requestMoreArticle)
    return () => {
      window.removeEventListener('scroll', requestMoreArticle)
    }
  }, [getNewsFn, requestMoreArticle])

  return (
    <div>
      {skeletonHandlerHOC(
        newsList.length ? (
          newsList.map((item, index) => {
            return (
              <NewsItem key={item.article_id} newsInfo={item} index={index} />
            )
          })
        ) : (
          <Empty description="暂时还没有数据哦！" />
        ),
        { rows: 3 },
        isSkeletonLoading,
      )}
      {isRequest && !isSkeletonLoading && (
        <Spin indicator={antIcon} tip="加载中..." />
      )}
      {hasMoreRef.current ||
        (newsList.length > 10 && (
          <div className="toBottom middle-item">已经没有更多内容了哦！</div>
        ))}
    </div>
  )
}
