import React, { memo, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { getScrollTop } from '../../../../utils/scrollHeight'
import { throttle } from 'lodash'

import { Avatar } from 'antd'
import OperateBtn from '../operate-btn'

import { ListHeaderWrapper } from './style'

export default memo(function ListHeader(props) {
  const { isSelf, concernUserFn, isShowHistory, avatar } = props
  const [isFixed, setIsFixed] = useState(null)
  let scrollTop = 0

  // 监听滚动条滑动到指定位置时，让导航栏固定;脱离指定位置时，让导航栏恢复正常
  const fixNav = throttle(() => {
    scrollTop = getScrollTop()
    if (scrollTop >= 251 && scrollTop < 700) {
      setIsFixed(true)
    }
    if (scrollTop >= 700) {
      setIsFixed(false)
    }
    if (scrollTop < 251) {
      setIsFixed(null)
    }
  }, 200)

  useEffect(() => {
    window.addEventListener('scroll', fixNav)
    return () => {
      window.removeEventListener('scroll', fixNav)
    }
  }, [fixNav])

  // 回到顶部的函数
  const goTop = () => {
    window.scrollTo(0, 0)
  }

  // 通过组件当前的状态来决定给nav栏添加什么样的类名
  const addClassByState = () => {
    if (isFixed === true) {
      return 'sticky'
    } else if (isFixed === false) {
      return 'stickyTop'
    } else {
      return 'not-sticky'
    }
  }

  const linkData = [
    {
      pathname: '',
      title: '个人主页',
    },
    {
      pathname: 'person',
      title: '阅读历史',
    },
    {
      pathname: 'likes',
      title: '点赞评论',
    },
    {
      pathname: 'collect',
      title: '我的收藏',
    },
    {
      pathname: 'concern',
      title: '关注列表',
    },
  ]

  // 如果用户设置了阅读历史不可见，则不展示阅读历史给他人
  isSelf || isShowHistory || linkData.splice(1, 1)

  return (
    <>
      {isFixed && <div className="blank" style={{ height: '50px' }}></div>}
      <ListHeaderWrapper className={addClassByState()}>
        <div className="container middle-item">
          <div className="content">
            {isFixed && (
              <Link to="" onClick={goTop} className="middle-item">
                <Avatar size={34} icon={<img src={avatar} alt="头像" />} />
              </Link>
            )}
            {linkData.map((item, index) => {
              const { title, pathname } = item
              return !index ? (
                <NavLink
                  key={title}
                  to={pathname}
                  end
                  className="middle-item"
                  onClick={goTop}
                >
                  {title}
                </NavLink>
              ) : (
                <NavLink
                  key={title}
                  to={pathname}
                  className="middle-item"
                  onClick={goTop}
                >
                  {title}
                </NavLink>
              )
            })}
          </div>
          {isFixed && (
            <OperateBtn isSelf={isSelf} concernUserFn={concernUserFn} />
          )}
        </div>
      </ListHeaderWrapper>
    </>
  )
})
