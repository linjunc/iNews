import React, { useState } from 'react'

import { TagItemWrapper } from './style'

export default function TagItem({ setNowData, nowData, tagInfo }) {
  const { name } = tagInfo
  const [isConcern, setIsConcern] = useState(false)
  // 将当前的状态存储
  const concernTag = () => {
    if (isConcern) {
      setNowData(nowData.filter((item) => item !== name))
      setIsConcern(false)
    } else {
      console.log(nowData)
      setNowData([...nowData, name])
      setIsConcern(true)
    }
  }

  return (
    <TagItemWrapper>
      <div className="tag-container middle-item">
        <div className="round middle-item">{name}</div>
        <button
          className={'btn' + (isConcern ? ' has-concern' : ' not-concern')}
          onClick={concernTag}
        >
          {isConcern ? '已关注' : '关注'}
        </button>
      </div>
    </TagItemWrapper>
  )
}
