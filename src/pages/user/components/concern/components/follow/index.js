import React, { memo, useEffect, useState, useRef, useMemo } from 'react'
import { useParams } from 'react-router'
import { throttle } from 'lodash'

import { lazyLoad } from '../../../../../../utils/optimize-fn'

import { skeletonHandlerHOC } from '../../../../../../utils/high-order-components'

import { message, Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import ConcernItem from '../concern-item'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export default memo(function ConcernFollow(props) {
  const { getFollowListFn, isFollower } = props
  const { id: user_id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [followingList, setFollowingList] = useState([])
  const [skipNum, setSkipNum] = useState(0)
  const skipNumRef = useRef(0)
  // 记录现在是否已再发请求了，如果是的话，那么就不要继续发送
  const [isRequest, setIsRequest] = useState(false)
  // 判断时主要依靠useRef中的值，useState只负责让组件重新渲染，这样才能出现加载框
  const isRequestRef = useRef(false)
  const hasMoreRef = useRef(true)

  // 用户滑动到底部的时候请求更多的数据
  const requestMoreArticle = useMemo(() => {
    return throttle(
      lazyLoad(() => {
        isRequestRef.current ||
          setSkipNum((skipNum) => (skipNumRef.current = skipNum + 10))
      }),
      200,
    )
  }, [])

  // 初始化数据
  useEffect(() => {
    skipNum && setSkipNum(0)
    skipNumRef.current = 0
    isLoading || setIsLoading(true)
    followingList.length && setFollowingList([])
    isRequest && setIsRequest(false)
    isRequestRef.current = false
    hasMoreRef.current = true
  }, [getFollowListFn])

  // 获取该用户所有的关注者列表
  useEffect(() => {
    const getFollowList = async () => {
      // 将isRequest的值改为true，表明现在正在发送请求
      setIsRequest((isRequestRef.current = true))
      try {
        const { data } = await getFollowListFn({
          user_id,
          n: 10,
          skip: skipNumRef.current,
        })
        console.log(data)
        setIsRequest((isRequestRef.current = false))
        // 如果数据已经没有更多了，则取消监听滚动事件，这样就不会继续发送请求了
        if (!data.has_more) {
          hasMoreRef.current = false
          window.removeEventListener('scroll', requestMoreArticle)
        }
        if (isFollower) {
          data.follower_list &&
            setFollowingList((follower_list) => [
              ...follower_list,
              ...data.follower_list,
            ])
        } else {
          data.follow_list &&
            setFollowingList((follow_list) => [
              ...follow_list,
              ...data.follow_list,
            ])
        }
      } catch (err) {
        message.error('请求失败，请重试！')
      } finally {
        setIsLoading(false)
      }
    }
    // 在没接收到响应之前不允许发送第二次请求
    isRequest || getFollowList()
  }, [skipNumRef.current, getFollowListFn])

  // 监听页面滚动事件
  useEffect(() => {
    window.addEventListener('scroll', requestMoreArticle)
    return () => {
      window.removeEventListener('scroll', requestMoreArticle)
    }
  }, [getFollowListFn, requestMoreArticle])

  return (
    <div className="items">
      {skeletonHandlerHOC(
        followingList.length ? (
          followingList.map((item, index) => {
            return (
              <ConcernItem key={item.user_id} userInfo={item} index={index} />
            )
          })
        ) : (
          <Empty description="暂时还没有关注信息哦！" />
        ),
        { rows: 0 },
        isLoading,
        true,
      )}
      {isRequest && !isLoading && <Spin indicator={antIcon} tip="加载中..." />}
      {hasMoreRef.current ||
        (followingList.length > 10 && (
          <div className="toBottom middle-item">已经没有更多内容了哦！</div>
        ))}
    </div>
  )
})
