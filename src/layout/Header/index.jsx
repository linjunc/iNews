import React from 'react';
import { Button } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import logoSrc from '../../assets/logo/logo.png'
const Header = () => {
    const navigate = useNavigate()
    const toUser = () => {
        navigate('/user')
    }

    const toDetail = () => {
        navigate('/detail/234')
    }

    const toLogin = () => {
        navigate('/login')
    }

    return (
        <div>
            <img src={logoSrc} alt="" />
            <Button onClick={toUser}> 个人主页 </Button>
            <Button onClick={toDetail}> 详情 </Button>
            <Button onClick={toLogin}> 登录 </Button>
            <Outlet />
        </div>
    );
};

export default Header;