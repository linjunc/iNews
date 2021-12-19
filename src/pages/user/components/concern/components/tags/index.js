import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { message } from 'antd'
import { getTagsList } from '../../../../../../services/user'
import { skeletonHandlerHOC } from '../../../../../../utils/high-order-components'
import ConcernItem from '../concern-item'

import { MyEmpty } from './style'

export default function ConcernTags() {
  const { id: user_id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [tagsList, setTagsList] = useState([])

  // 获取该用户所有的关注者列表
  useEffect(async () => {
    try {
      const res = await getTagsList({
        user_id,
        n: '10',
        skip: '0',
      })
      res.data.tag_list && setTagsList(res.data.tag_list)
    } catch (err) {
      message.error('请求失败，请重试！')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div>
      {skeletonHandlerHOC(
        tagsList.length ? (
          tagsList.map((item) => {
            return <ConcernItem key={item.name} userInfo={item} isTag={true} />
          })
        ) : (
          <MyEmpty description="您暂时还没有关注标签哦！" />
        ),
        { rows: 0 },
        isLoading,
        true,
      )}
    </div>
  )
}
