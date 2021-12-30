import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { throttle } from 'lodash'
import axios from 'axios'

import { skeletonHandlerHOC } from '../../../../utils/high-order-components'
import { lazyLoad } from '../../../../utils/optimize-fn'

import { message, Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import NewsItem from '../news-item'

const CancelToken = axios.CancelToken
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export default function NewsList(props) {
  // 获取发送请求的函数
  const { getNewsFn } = props
  const { id: user_id } = useParams()
  const isSkeletonLoadingRef = useRef(true)
  const [newsList, setNewsList] = useState([])
  const [skipNum, setSkipNum] = useState(0)
  const skipNumRef = useRef(0)
  // 记录现在是否已再发请求了，如果是的话，那么就不要继续发送
  const [isRequest, setIsRequest] = useState(false)
  // 判断时主要依靠useRef中的值，useState只负责让组件重新渲染，这样才能出现加载框
  const isRequestRef = useRef(false)
  const hasMoreRef = useRef(true)
  // 包含取消请求函数的对象
  const cancelRef = useRef(CancelToken.source())

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
    // 初始化一个新的含有取消请求函数的对象
    cancelRef.current = CancelToken.source()
    skipNum && setSkipNum(0)
    skipNumRef.current = 0
    isSkeletonLoadingRef.current = true
    newsList.length && setNewsList([])
    isRequest && setIsRequest(false)
    isRequestRef.current = false
    hasMoreRef.current = true
  }, [getNewsFn])

  useEffect(() => {
    const reqMore = async () => {
      try {
        // 将isRequest的值改为true，表明现在正在发送请求
        setIsRequest((isRequestRef.current = true))
        const { data } = await getNewsFn(
          {
            user_id,
            n: 10,
            skip: skipNumRef.current,
          },
          cancelRef.current.token,
        )
        isSkeletonLoadingRef.current = false
        // 如果数据已经没有更多了，则取消监听滚动事件，这样就不会继续发送请求了
        if (!data.has_more) {
          hasMoreRef.current = false
          window.removeEventListener('scroll', requestMoreArticle)
        }
        data.article_list &&
          setNewsList((article_list) => [...article_list, ...data.article_list])
      } catch (err) {
        if (err.message !== '请求被取消了') {
          message.error('请求失败，请刷新页面重试！')
          isSkeletonLoadingRef.current = false
        } else {
          isSkeletonLoadingRef.current = true
        }
      } finally {
        setIsRequest((isRequestRef.current = false))
      }
    }
    // 在没接收到响应之前不允许发送第二次请求
    isRequestRef.current || reqMore()
  }, [skipNumRef.current, getNewsFn])

  // 监听页面滚动事件
  useEffect(() => {
    window.addEventListener('scroll', requestMoreArticle)
    return () => {
      // 如果切换请求函数的时候仍然还在请求，那么就需要取消这个请求
      isRequestRef.current && cancelRef.current.cancel('请求被取消了')
      // 请求函数改变，将骨架屏加载状态调为false
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
        isSkeletonLoadingRef.current,
      )}
      {isRequest && !isSkeletonLoadingRef.current && (
        <Spin indicator={antIcon} tip="加载中..." />
      )}
      {hasMoreRef.current ||
        (newsList.length > 10 && (
          <div className="toBottom middle-item">已经没有更多内容了哦！</div>
        ))}
    </div>
  )
}
