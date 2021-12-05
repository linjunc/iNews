// 登录页面
import React, { useRef,useState } from 'react'
import ParticlesBg from 'particles-bg'
import { Form, Input, Button, Checkbox, Carousel } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import LoginText from './components/LoginText'


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

const Login = () => {
  const navigate = useNavigate()
  const calRef = useRef(null)
  const [values, setValues] = useState({
    username:'',
    password:''
  })
  const onChange = e => {
      // 使用e6扩展
      setValues({...values,[e.target.name]:e.target.name})
      console.log(values)
  }
  const handleSubmit = e =>{
      console.log(e)
      e.preventDefault();
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
            {/* 在这里增加表单提交验证 */}
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onSubmit = {handleSubmit}
              noValidate
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  name = "username"
                  onChange = {onChange}
                  value={values.username}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  ref={calRef}
                  name = "username"
                  onChange = {onChange}
                  value={values.password}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
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