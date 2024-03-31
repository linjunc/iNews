import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'

import { lazyLoad } from '../../../../../../utils/optimize-fn'
import { getLocal } from '../../../../../../utils/storage'

import { Button, message } from 'antd'
import { FocusAuthor, focusTags } from '../../../../../../services/user'
import noAvatar from '../../../../../../assets/user-center/default-avatar.png'

import { ConcernItemWrapper } from './style'

export default function ConcernItem(props) {
  const { userInfo, isTag, index } = props
  const navigate = useNavigate()
  const avatarRef = useRef()

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
    if (getLocal('token')) {
      setIsFollow(!isFollow)
      isTag
        ? focusTags({
            user_id: media_id,
            tag_list: [`${tag}`],
          })
        : FocusAuthor({ media_id })
    } else {
      message.warning('您还没有登录哦！')
    }
  }

  // item被点击的时候跳转至对应的个人主页
  const itemClick = () => {
    if (!isTag) {
      navigate(`/user/${media_id}`)
    }
  }

  useEffect(() => {
    const imgDom = avatarRef.current
    // 如果该新闻有图片，则需要为其监听滚动事件
    if (imgDom) {
      // 一开始的前5张图片为了确保用户一开始就能看见，所以是需要立即渲染的
      if (index < 7) {
        imgDom.src = avatar
        imgDom.onload = () => (imgDom.style.opacity = 1)
      } else {
        const imgLazyLoad = throttle(
          lazyLoad(
            () => {
              imgDom.src = avatar
              imgDom.onload = () => {
                // 图片加载完毕之后显示图片
                imgDom.style.opacity = 1
                window.removeEventListener('scroll', imgLazyLoad)
              }
            },
            imgDom,
            50,
          ),
          200,
        )
        window.addEventListener('scroll', imgLazyLoad)
        return () => {
          window.removeEventListener('scroll', imgLazyLoad)
        }
      }
    }
  }, [avatar, index])

  return (
    <ConcernItemWrapper onClick={itemClick}>
      <div>
        {isTag || (
          <div className="avatar">
            <img
              alt="用户头像"
              ref={avatarRef}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = noAvatar
              }}
            />
          </div>
        )}
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
