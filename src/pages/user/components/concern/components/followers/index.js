import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getFollowersList } from '../../../../../../services/user'
import { skeletonHandlerHOC } from '../../../../../../utils/high-order-components'

import { message, Empty } from 'antd'
import ConcernItem from '../concern-item'

export default memo(function ConcernFollowers() {
  const { id: user_id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [followersList, setFollowersList] = useState([])

  // 获取该用户所有的关注者列表
  useEffect(async () => {
    try {
      const res = await getFollowersList({
        user_id,
        n: '10',
        skip: '0',
      })
      console.log(res)
      res.data.follower_list && setFollowersList(res.data.follower_list)
      setIsLoading(false)
    } catch (err) {
      message.error('请求失败，请重试！')
    }
  }, [])

  return (
    <div className="items">
      {skeletonHandlerHOC(
        followersList.length ? (
          followersList.map((item) => {
            return <ConcernItem key={item.user_id} userInfo={item} />
          })
        ) : (
          <Empty description="您暂时还没有关注标签哦！" />
        ),
        { rows: 0 },
        isLoading,
        true,
      )}
    </div>
  )
})
