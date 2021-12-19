import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { skeletonHandlerHOC } from '../../../../../../utils/high-order-components'
import { getFollowingList } from '../../../../../../services/user'

import { message, Empty } from 'antd'
import ConcernItem from '../concern-item'

export default memo(function ConcernFollowing() {
  const { id: user_id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [followingList, setFollowingList] = useState([])

  // 获取该用户所有的关注者列表
  useEffect(async () => {
    try {
      const res = await getFollowingList({
        user_id,
        n: '10',
        skip: '0',
      })
      res.data.follow_list && setFollowingList(res.data.follow_list)
    } catch (err) {
      message.error('请求失败，请重试！')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="items">
      {skeletonHandlerHOC(
        followingList.length ? (
          followingList.map((item) => {
            return <ConcernItem key={item.user_id} userInfo={item} />
          })
        ) : (
          <Empty description="您暂时还没有关注别人哦！" />
        ),
        { rows: 0 },
        isLoading,
        true,
      )}
    </div>
  )
})
