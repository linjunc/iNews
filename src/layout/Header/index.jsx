import React, { useState, useEffect } from 'react';
import { Button, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router';
import { throttle } from 'lodash'

import { getScrollTop } from '../../utils/scrollHeight';
import logoSrc from '../../assets/logo/logo_text.png'
import { MenuWrapper, FixedContainer } from './style'

const { SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("mail")
    const [show, setShow] = useState(true)  // show 的改变导致了组件的重新渲染，怎么解决呢
    const navigate = useNavigate()
    // 判断滚动方向
    let scrollTop = 0
    let topValue = 0
    // 函数处理
    const handleClick = e => {
        setCurrent(e.key);
        navigate(`/`, { state: { current: e.key } })
    };

    // 获取距离顶部的距离
    const bindHandleScroll = throttle(() => {
        scrollTop = getScrollTop();
        // 
        // 大于一定距离并且上滚了，头部出现
        if (scrollTop >= 500 && scrollTop >= topValue) {
            setShow(false)
        }
        // 下滚了
        if (scrollTop <= topValue) {
            setShow(true)
        }
        setTimeout(function () { topValue = scrollTop; }, 0);
    }, 200)
    // 初始化滚动事件
    useEffect(() => {
        window.addEventListener('scroll', bindHandleScroll)
        return () => {
            window.removeEventListener('scroll', bindHandleScroll)
        }
    }, [])


    const toLogin = () => {
        navigate('/login')
    }

    const toHome = () => {
        navigate('/')
    }
    
    return (
        <div>
            <FixedContainer style={{ transform: (show) && "translateZ(0)" }}>
                <MenuWrapper>
                    <div className='layout-logo'>
                        <img src={logoSrc} onClick={toHome} alt="logo" />
                    </div>
                    <div className='layout-nav'>
                        <Menu className='layout-menu' onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                            <Menu.Item key="recommend">
                                推荐
                            </Menu.Item>
                            <Menu.Item key="app">
                                热点
                            </Menu.Item>
                            <Menu.Item key="finance">
                                财经
                            </Menu.Item>
                            <Menu.Item key="science">
                                科技
                            </Menu.Item>
                            <Menu.Item key="international">
                                国际
                            </Menu.Item>
                            <Menu.Item key="play">
                                娱乐
                            </Menu.Item>
                            <Menu.Item key="live">
                                直播
                            </Menu.Item>
                            <Menu.Item key="sport">
                                体育
                            </Menu.Item>
                            <SubMenu key="SubMenu" title="更多">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className='layout-search-box'>
                        <Input className='layout-search' placeholder="请输入搜索的内容" allowClear />
                        <button className='layout-search-button'><SearchOutlined /></button>
                    </div>
                    <Button type="primary" onClick={toLogin} className='login-button'>登录</Button>
                </MenuWrapper>
            </FixedContainer>
            {/* 占去头部的 64px */}
            <div style={{ height: "64px" }}></div>
            <Outlet />

            {/* <div style={{ height: "1400px", backgroundColor: "skyblue" }}> ddd</div> */}
        </div >
    );
};

export default Header;