import React, { memo, useState } from 'react'

import { focusTags } from '../../../../../../../../services/user'
import { getSession, setSession } from '../../../../../../../../utils/storage'

import { TagItemWrapper } from './style'

export default memo(function TagItem(props) {
  const { name, tag, is_follow = false } = props.tagInfo
  const [isConcern, setIsConcern] = useState(is_follow)

  // 在本地存取已关注标签列表
  const setTagList = (arr) => {
    return setSession('concernTagLists', JSON.stringify(arr))
  }

  // 在本地存取已关注标签列表
  const getTagList = () => {
    return JSON.parse(getSession('concernTagLists') || '[]')
  }

  // 用户点击关注按钮后发送请求并改变状态
  const concernTag = () => {
    // 从本地取出关注的列表
    const hasFollowTags = getTagList()
    if (!isConcern) {
      const newArr = [...hasFollowTags, `${tag}`]
      setTagList(newArr)
      focusTags({
        tag_list: newArr,
      })
    } else {
      let newArr = getTagList()
      const index = newArr.indexOf(tag)
      if (index > -1) {
        newArr.splice(index, 1)
      }
      setTagList(newArr)
      focusTags({
        tag_list: newArr,
      })
    }
    setIsConcern(!isConcern)
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
})
