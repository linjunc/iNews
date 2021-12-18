// 登录页面
import React, { useRef, useState, useContext } from 'react'
import ParticlesBg from 'particles-bg'
import { Form, Input, Button, Carousel, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import LoginText from './components/LoginText'
import { userLogin } from '../../services/login'
import logo from '../../assets/logo/logo.png'
import slogan from '../../assets/login/slogan.png'
import logoCol from '../../assets/login/logo-col.png'

import {
  LoginContainer,
  LoginForm,
  AboutUs,
  Title,
  LoginRight,
  LoginLeft,
} from './style'
import { userContext } from '../../models/context'
import { INIT_INFO } from '../../models/constant'

const Login = () => {
  const navigate = useNavigate()
  const [loginLoading, setLoginLoading] = useState(false)
  const { userDispatch } = useContext(userContext)
  const calRef = useRef(null)
  const onFinish = async (values) => {
    setLoginLoading(true)
    try {
      const data = await userLogin(values)
      if (data.data.code === 200) {
        message.success(data.data.msg)
        localStorage.setItem('token', JSON.stringify(data.data.token))
        localStorage.setItem('userInfo', JSON.stringify(data.data.user_info))
        userDispatch({
          type: INIT_INFO,
          userInfo: data.data.user_info,
        })
        navigate('/')
      } else {
        message.error(data.data.msg)
        setLoginLoading(false)
        /* 保存token信息到本地 */
        //如果用户选择记住的话，就进行存储
      }
    } catch (error) {
      message.error('未知错误')
      setLoginLoading(false)
    }
  }
  return (
    <LoginContainer>
      <LoginForm>
        <ParticlesBg
          type="cobweb"
          bg={{
            position: 'absolute',
            left: 0,
            zIndex: -1,
            width: '100%',
            height: '60vh',
            margin: '30px 0',
          }}
        />
        {/* grid 左右布局 */}
        {/* loginLeft 主要用来占位 */}
        <LoginLeft>
          <LoginText />
        </LoginLeft>
        {/* 右侧登录 */}
        <LoginRight>
          <div className="opacity">
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
              onFinish={onFinish}
            >
              <Form.Item
                name="account"
                rules={[
                  {
                    required: true,
                    message: '请输入你的账号',
                  },
                  {
                    pattern: /^[^\u4e00-\u9fa5]+$/,
                    message: '请勿输入中文',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入账号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loginLoading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录 / 注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </LoginRight>
      </LoginForm>
      {/* 关于我们 */}
      <AboutUs>
        {/* 轮播图 */}
        <Carousel
          ref={calRef}
          dots={false}
          className="carousel-container"
          slidesToShow={2}
          arrows={true}
          slidesToScroll={1}
          autoplay
        >
          <div
            className="carouselContent"
            onClick={() => {
              navigate('/')
            }}
          >
            <img style={{ width: '100%' }} src={logoCol} alt="团队logo" />
          </div>
          <div className="carouselContent">
            <img style={{ width: '100%' }} src={slogan} alt="slogan" />
          </div>
        </Carousel>
      </AboutUs>
    </LoginContainer>
  )
}

export default Login
