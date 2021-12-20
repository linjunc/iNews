import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { skeletonHandlerHOC } from '../../../../utils/high-order-components'
import { getCollectList } from '../../../../services/user'

import { message, Empty } from 'antd'
import NewsItem from '../news-item'

export default memo(function CollectNews() {
  const { id: user_id } = useParams()
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const [collectList, setCollectList] = useState([])

  useEffect(async () => {
    try {
      const { data } = await getCollectList({
        user_id,
        n: 10,
        skip: 0,
      })
      data.article_list &&
        setCollectList((article_list) => [
          ...article_list,
          ...data.article_list,
        ])
    } catch (err) {
      message.error('请求失败，请刷新页面重试！')
    } finally {
      setIsSkeletonLoading(false)
    }
  }, [])

  return (
    <div>
      {skeletonHandlerHOC(
        collectList.length ? (
          collectList.map((item) => {
            return <NewsItem key={item.article_id} newsInfo={item} />
          })
        ) : (
          <Empty description="暂时还没有关注过新闻哦！" />
        ),
        { rows: 3 },
        isSkeletonLoading,
      )}
    </div>
  )
})
