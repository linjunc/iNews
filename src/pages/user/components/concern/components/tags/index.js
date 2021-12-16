import React, { memo } from 'react'

import ConcernItem from '../concern-item'

export default memo(function ConcernTags() {
  const listData = [
    {
      title: 'LYM',
    },
    {
      title: '丁同学啊',
    },
    {
      title: '用户4564654',
    },
    {
      title: '温暖回忆',
    },
    {
      title: '小四456',
    },
    {
      title: '我是何同学',
    },
    {
      title: '罗翔说刑法',
    },
    {
      title: '芜湖',
    },
    {
      title: '好家伙',
    },
  ]

  return (
    <div className="items">
      {listData.map((item) => {
        return <ConcernItem key={item.title} />
      })}
    </div>
  )
})
