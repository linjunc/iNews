import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { skeletonHandlerHOC } from '../../../../utils/high-order-components'
import { getLikeList } from '../../../../services/user'

import { message, Empty } from 'antd'
import NewsItem from '../news-item'

export default memo(function LikeNews() {
  const { id: user_id } = useParams()
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const [likeList, setLikeList] = useState([])

  useEffect(async () => {
    try {
      const { data } = await getLikeList({
        user_id,
        n: 10,
        skip: 0,
      })
      console.log(data.article_list)
      data.article_list &&
        setLikeList((article_list) => [...article_list, ...data.article_list])
    } catch (err) {
      message.error('请求失败，请刷新页面重试！')
    } finally {
      setIsSkeletonLoading(false)
    }
  }, [])

  return (
    <div>
      {skeletonHandlerHOC(
        likeList.length ? (
          likeList.map((item) => {
            return (
              <NewsItem
                key={item.article_id}
                newsInfo={item}
                isLikeModel={true}
              />
            )
          })
        ) : (
          <Empty description="暂时还没有点赞过新闻哦！" />
        ),
        { rows: 3 },
        isSkeletonLoading,
      )}
    </div>
  )
})
