import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar, Button } from 'antd'
import { FocusAuthor, focusTags } from '../../../../../../services/user'

import { ConcernItemWrapper } from './style'

export default function ConcernItem(props) {
  const { userInfo, isTag } = props
  const navigate = useNavigate()

  const {
    avatar,
    nickname,
    introduction,
    user_id: media_id,
    is_follow = true,
    tag,
    name,
  } = userInfo || {}
  // 需要根据用户的状态从而控制按钮的颜色
  const [isFollow, setIsFollow] = useState(is_follow)

  // 点击按钮后发送请求
  const followUser = (e) => {
    // 阻止冒泡事件
    e.stopPropagation()
    setIsFollow(!isFollow)
    const res = isTag
      ? focusTags({
          user_id: media_id,
          tag_list: [`${tag}`],
        })
      : FocusAuthor({ media_id })
  }

  // item被点击的时候跳转至对应的个人主页
  const itemClick = () => {
    if (!isTag) {
      navigate(`/user/${media_id}`)
    }
  }

  return (
    <ConcernItemWrapper onClick={itemClick}>
      <div>
        {isTag || <Avatar size={45} alt="用户头像" src={avatar} />}
        <div>
          <h4 className="title text-nowrap">{nickname || name}</h4>
          <p className="brief text-nowrap">{introduction}</p>
        </div>
      </div>
      <Button
        className={
          (isFollow ? 'has-follow' : 'not-follow') + ' btn-style middle-item'
        }
        onClick={followUser}
      >
        {isFollow ? '已关注' : '关注'}
      </Button>
    </ConcernItemWrapper>
  )
}
