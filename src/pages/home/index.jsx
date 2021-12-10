import React, { useMemo } from 'react'
import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomeContainer } from './style'
import Parallax from './components/Parallax'

const Home = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const channel = useMemo(
    () => location.state?.current ?? '首页',
    [location.state],
  )
  // 路由跳转
  const toDetail = () => {
    navigate('/detail/61aef05d96a6ccbc6f9c4b15') // id
  }

  return (
    <HomeContainer>
      <Parallax></Parallax>
      {channel}
      <div style={{ height: '3000px' }}></div>
      <Button onClick={toDetail}> 测试详情 </Button>
    </HomeContainer>
  )
}

export default Home
