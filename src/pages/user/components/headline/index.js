import React, { memo, useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { getScrollTop } from '../../../../utils/scrollHeight'
import { throttle } from 'lodash'

import { Avatar } from 'antd'
import OperateBtn from '../operate-btn'

import { ListHeaderWrapper } from './style'

export default memo(function ListHeader(props) {
  const { isSelf, concernUserFn, isShowHistory, avatar, type } = props
  const [isFixed, setIsFixed] = useState(null)
  // 利用useRef来记录上次滚动的距离而不是用一个变量，因为组件更新的时候变量会被重新赋值，从而影响判断
  const topValue = useRef(0)
  let scrollTop = 0
  // 记录上一次的滚动距离，用于判断滚动方向

  // 监听滚动条滑动到指定位置时，让导航栏固定;脱离指定位置时，让导航栏恢复正常
  const fixNav = throttle(() => {
    scrollTop = getScrollTop()
    setTimeout(() => {
      topValue.current = scrollTop
    }, 0)
    if (scrollTop < 251) {
      setIsFixed(null)
    }
    // 大于一定距离并且下滚了，头部出现
    if (scrollTop >= 251 && scrollTop < 700 && scrollTop >= topValue.current) {
      setIsFixed(true)
    }
    if (scrollTop <= topValue.current && scrollTop >= 251) {
      setIsFixed(true)
    }
    // 大于一定距离并且下滚了，头部出现
    if (scrollTop >= 700 && scrollTop >= topValue.current) {
      setIsFixed(false)
    }
    // 上滚
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
    if (isFixed) {
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
      title: isSelf ? '我的点赞' : '他的点赞',
    },
    {
      pathname: 'collect',
      title: isSelf ? '我的收藏' : '他的收藏',
    },
    {
      pathname: 'concern',
      title: isSelf ? '我的关注' : '他的关注',
    },
  ]

  // 如果用户设置了阅读历史不可见，则不展示阅读历史给他人
  isSelf || isShowHistory || linkData.splice(1, 1)

  // 如果用户类型是媒体，则需要展现其发布的文章列表上添加一项
  type === 'media' &&
    linkData.splice(1, 0, {
      pathname: 'released',
      title: isSelf ? '我的文章' : '他的文章',
    })

  return (
    <>
      {isFixed !== null && (
        <div className="blank" style={{ height: '50px' }}></div>
      )}
      <ListHeaderWrapper className={addClassByState()}>
        <div className="container middle-item">
          <div className="content">
            {isFixed !== null && (
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
          {isFixed !== null && (
            <OperateBtn isSelf={isSelf} concernUserFn={concernUserFn} />
          )}
        </div>
      </ListHeaderWrapper>
    </>
  )
})
