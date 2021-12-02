// 登录页面
import React from 'react';
import { getData } from '../../services/test';

const Login = () => {
    const login = async () => {
        const data = await getData()
        console.log(data);
    }
    return (
        <div onClick={login}>
            登录页面
        </div>
    );
};

export default Login;