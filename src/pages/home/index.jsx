import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeContainer } from './style';

const Home = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const channel = useMemo(() => location.state?.current ?? '首页', [location.state])
    // 路由跳转
    const toUser = () => {
        navigate('/user')
    }

    const toDetail = () => {
        navigate('/detail/61aef05d96a6ccbc6f9c4b15') // id
    }

    return (
        <HomeContainer>
            <div className="test1"></div>
            {channel}
            <Button onClick={toUser}> 测试个人主页 </Button>
            <Button onClick={toDetail}> 测试详情 </Button>
        </HomeContainer>
    );
};

export default Home;


