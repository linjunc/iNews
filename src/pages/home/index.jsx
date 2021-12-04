import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const channel = useMemo(() => location.state?.current ?? '首页', [location.state])

    // 路由跳转
    const toUser = () => {
        navigate('/user')
    }

    const toDetail = () => {
        navigate('/detail/234') // id
    }

    return (
        <div>
            {channel}
            <Button onClick={toUser}> 测试个人主页 </Button>
            <Button onClick={toDetail}> 测试详情 </Button>
        </div>
    );
};

export default Home;