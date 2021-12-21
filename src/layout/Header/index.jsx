import React, { useState, useEffect } from 'react'
import Avatar from '../../components/Avatar'
import Search from '../../components/Search'
import Nav from '../../components/Nav'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { throttle } from 'lodash'

import { getScrollTop } from '../../utils/scrollHeight'
import logoSrc from '../../assets/logo/logo_text.png'
import { MenuWrapper, FixedContainer } from './style'
import { headerShowContext } from '../../models/context'

const Header = () => {
  const [show, setShow] = useState(false) // show 的改变导致了组件的重新渲染，怎么解决呢
  const [focus, setFocus] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // 判断滚动方向
  let scrollTop = 0
  let topValue = 0

  // 获取距离顶部的距离
  const bindHandleScroll = throttle(() => {
    scrollTop = getScrollTop()
    // 大于一定距离并且上滚了，头部出现
    if (scrollTop >= 700 && scrollTop >= topValue) {
      setShow(false)
    }
    // 上滚
    if (scrollTop <= topValue) {
      setShow(true)
    }
    setTimeout(function () {
      topValue = scrollTop
    }, 0)
  }, 200)
  // 初始化滚动事件
  useEffect(() => {
    // 如果是首页，让首页用context控制
    if (pathname === '/') return
    window.addEventListener('scroll', bindHandleScroll)
    // 修复使用浏览器返回的bug
    setShow(true)

    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // 路由跳转，去首页
  const toHome = () => {
    navigate('/')
  }
  // 路由跳转，去疫情地图
  const toCovid = () => {
    navigate('/covidMap')
  }

  return (
    <headerShowContext.Provider value={[show, setShow]}>
      <div>
        <FixedContainer style={{ transform: show && 'translateZ(0)' }}>
          <MenuWrapper>
            <div className="test">
              <div className="layout-logo">
                <img src={logoSrc} onClick={toHome} alt="logo" />
              </div>
              <Nav></Nav>
            </div>
            <div className="test">
              <div
                className={`layout-search-box ${focus ? 'search-focus' : ''}`}
              >
                <Search
                  className="layout-search"
                  setFocus={setFocus}
                  style={{
                    height: 36,
                    backgroundColor: '#f5f5f5',
                    focusColor: '#d1e9ff',
                  }}
                  placeholder="请输入搜索的内容"
                ></Search>
              </div>
              <div className={`covid ${focus ? 'hide' : ''}`} onClick={toCovid}>
                肺炎地图
              </div>
            </div>
            <Avatar></Avatar>
          </MenuWrapper>
        </FixedContainer>
        {/* 占去头部的 64px */}
        <div style={{ height: '64px' }}></div>

        {/* 如果是首页，将头部显示控制交给首页控制，因为首页已经监听了滚动，再监听一次有点浪费
        本来想用prop慢慢传，发现在Outlet就卡住了，和VueRouter的router-view不一样，最后选择context */}
        <Outlet />

        {/* <div style={{ height: "1400px", backgroundColor: "skyblue" }}> ddd</div> */}
      </div>
    </headerShowContext.Provider>
  )
}

export default Header
