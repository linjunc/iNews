import React, { useState } from 'react';
import { Button, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router';

import logoSrc from '../../assets/logo/logo_text.png'
import { MenuWrapper } from './style'

const { SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("mail")
    const navigate = useNavigate()

    // 函数处理
    const handleClick = e => {
        setCurrent(e.key);
        navigate(`/`, { state:{current: e.key} })
    };


    // 路由跳转
    const toUser = () => {
        navigate('/user')
    }

    const toDetail = () => {
        navigate('/detail/234') // id
    }

    const toLogin = () => {
        navigate('/login')
    }

    const toHome = () => {
        navigate('/')
    }
    return (
        <div>
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
            <Outlet />
            <Button onClick={toUser}> 测试个人主页 </Button>
            <Button onClick={toDetail}> 测试详情 </Button>
        </div>
    );
};

export default Header;