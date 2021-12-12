import React, { memo, useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { getScrollTop } from '../../../../utils/scrollHeight'
import { throttle } from 'lodash'

import { Avatar } from 'antd'
import EditBtn from '../edit-btn'

import { ListHeaderWrapper } from './style'

export default memo(function ListHeader() {
  const [isFixed, setIsFixed] = useState(null)
  let topValue = 0
  let scrollTop = 0

  // 监听滚动条滑动到指定位置时，让导航栏固定;脱离指定位置时，让导航栏恢复正常
  const fixNav = () => {
    scrollTop = getScrollTop()
    setTimeout(function () {
      topValue = scrollTop
    }, 0)
    //记住这里时383
    if (scrollTop >= 383 && scrollTop < 700) {
      setIsFixed(1)
      return
    }
    if (scrollTop >= 700 && scrollTop >= topValue) {
      setIsFixed(2)
      return
    }
    if (scrollTop < 383) {
      setIsFixed(null)
      return
    }
    if (scrollTop <= topValue) {
      setIsFixed(1)
      return
    }
  }

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
    if (!isFixed) {
      return 'not-stiky'
    } else if (isFixed === 1) {
      return 'stiky'
    } else {
      return 'stikyTop'
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
      pathname: 'tags',
      title: '关注列表',
    },
    {
      pathname: 'report',
      title: '年度报告',
    },
  ]

  return (
    <>
      {isFixed && <div className="blank" style={{ height: '50px' }}></div>}
      <ListHeaderWrapper className={addClassByState()}>
        <div className="container middle-item">
          <div className="content">
            {isFixed && (
              <Link to="" onClick={goTop} className="middle-item">
                <Avatar
                  size={34}
                  icon={
                    <img
                      src="https://p3-passport.byteacctimg.com/img/user-avatar/7daa5395a692d2f501867755d2667c07~300x300.image"
                      alt="头像"
                    />
                  }
                />
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
          {isFixed && <EditBtn />}
        </div>
      </ListHeaderWrapper>
    </>
  )
})
