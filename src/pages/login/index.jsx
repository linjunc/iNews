// 登录页面
import React, { useRef,useState,useEffect } from 'react';
import ParticlesBg from 'particles-bg'
import { Form, Input, Button, Checkbox, Carousel } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import axios from 'axios'
import LoginText from './components/LoginText'
import qs from 'qs';
import logo from '../../assets/logo/logo.png'
import slogan from '../../assets/login/slogan.png'
import logoCol from '../../assets/login/logo-col.png'
import { post_values } from '../../services/login';
import {
    LoginContainer,
    LoginForm,
    AboutUs,
    Title,
    LoginRight,
    LoginLeft
} from './style'

const Login = () => {
    const navigate = useNavigate()
    const calRef = useRef(null);
    const onFinish = async (values) => {
<<<<<<< HEAD
        const res = await post_values(values)
        if(res)navigate('/ ')
=======
        /* 禁止刷新 */
        const data = {
            "account": "",
            "password": ""
        }
        //定义一个data对象
        data['account'] = values.username
        data['password'] = values.password
        console.log('data:', data);
        const res = await axios({
            method:'post',
            headers:{"content-type":"application/json"},
            url: 'https://qctm8y.api.cloudendpoint.cn/user_login',
            data: data
        }).then(
            /* 获取到axios的数据 */
            res => {
              console.log("get res:",res);
              /* 登录成功 1*/
              if(res.data.msg === "账号或密码错误"){
                alert("账号或密码错误")
              }else{
                 /* 保存token信息到本地 */
                 window.localStorage.setItem('token',res.data.token)
                navigate('/');
                console.log("登录成功")
              }
           },error => {
              console.log("get request failed:",error);
           }
         );
>>>>>>> b3ed3f3102268fa6bbfe7874e54a2d22d0c09c78
      };
    return (
        <LoginContainer>
            <LoginForm>
                <ParticlesBg
                    type="cobweb"
                    bg={{
                        position: "absolute",
                        left: 0,
                        zIndex: -1,
                        width: "100%",
                        height: "60vh",
                        margin: "30px 0"
                    }}
                />
                {/* grid 左右布局 */}
                {/* loginLeft 主要用来占位 */}
                <LoginLeft>
                    <LoginText />
                </LoginLeft>
                {/* 右侧登录 */}
                <LoginRight>
                    <div className='opacity'>
                        <div
                            className="logo"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <img
                                src={logo}
                                alt="logo"
                                title="点击返回首页"
                                width="120px"
                                height="120px"
                                className="logo-img"
                            />
                        </div>
                        <Title> 账号登录 </Title>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish = {onFinish}
                        >
                            <Form.Item
                                name="account"
                                rules={[{ required: true, message: 'Please input your account!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="account" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </LoginRight>
            </LoginForm>
            {/* 关于我们 */}
            <AboutUs>
                {/* <AboutTitle>关于我们</AboutTitle> */}
                {/* 轮播图 */}
                {/* 左右按钮 */}
                {/* <ArrowL onClick={() => { handleGotoPrev() }}><LeftCircleTwoTone style={{ fontSize: "30px" }} /></ArrowL>
                <ArrowR onClick={() => { handleGotoNext() }}><RightCircleTwoTone style={{ fontSize: "30px" }} /></ArrowR> */}
                <Carousel
                    ref={calRef}
                    dots={false}
                    className='carousel-container'
                    slidesToShow={2}
                    arrows={true}
                    slidesToScroll={1}
                    autoplay
                >
                    <div className='carouselContent' onClick={() => { navigate('/') }}><img style={{ width: "100%" }} src={logoCol} alt="团队logo" /></div>
                    <div className='carouselContent'><img style={{ width: "100%" }} src={slogan} alt="slogan" /></div>
                </Carousel>
            </AboutUs>
        </LoginContainer>
    );
};


export default Login;