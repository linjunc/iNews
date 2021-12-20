import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'react-router'
import { throttle } from 'lodash'

import { skeletonHandlerHOC } from '../../../../utils/high-order-components'
import { getHistoryList } from '../../../../services/user'
import { lazyLoad } from '../../../../utils/optimize-fn'

import { message, Empty } from 'antd'
import NewsItem from '../news-item'

export default memo(function ReadHistory() {
  const { id: user_id } = useParams()
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const [historyList, setHistoryList] = useState([])
  const [skipNum, setSkipNum] = useState(0)
  // 记录现在是否已再发请求了，如果是的话，那么就不要继续发送
  const isRequest = useRef(false)

  // 用户滑动到底部的时候请求更多的数据
  const requestMoreArticle = useCallback(
    throttle(
      lazyLoad(() => {
        isRequest.current || setSkipNum((skipNum) => skipNum + 10)
      }),
      200,
    ),
    [],
  )

  useEffect(async () => {
    try {
      // 将current的值改为true，表明现在正在发送请求
      isRequest.current = true
      const { data } = await getHistoryList({
        user_id,
        n: 10,
        skip: skipNum,
      })
      isRequest.current = false
      console.log(data)
      // 如果数据已经没有更多了，则取消监听滚动事件，这样就不会继续发送请求了
      data.has_more ||
        (() => {
          console.log('滚动事件被清除了')
          window.removeEventListener('scroll', requestMoreArticle)
        })()
      data.article_list &&
        setHistoryList((article_list) => [
          ...article_list,
          ...data.article_list,
        ])
    } catch (err) {
      message.error('请求失败，请刷新页面重试！')
    } finally {
      setIsSkeletonLoading(false)
    }
  }, [skipNum, requestMoreArticle])

  useEffect(() => {
    console.log('监听事件')
    window.addEventListener('scroll', requestMoreArticle)
    return () => {
      window.removeEventListener('scroll', requestMoreArticle)
    }
  }, [requestMoreArticle])

  return (
    <div>
      {skeletonHandlerHOC(
        historyList.length ? (
          historyList.map((item) => {
            return <NewsItem key={item.article_id} newsInfo={item} />
          })
        ) : (
          <Empty description="暂时还没有历史记录哦！" />
        ),
        { rows: 3 },
        isSkeletonLoading,
      )}
    </div>
  )
})
