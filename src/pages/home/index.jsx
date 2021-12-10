import React, { useMemo } from 'react'
import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomeContainer } from './style'
import Article from './components/Article'

const Home = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const channel = useMemo(
    () => location.state?.current ?? '首页',
    [location.state],
  )
  console.log(channel)
  // 路由跳转
  const toDetail = () => {
    navigate('/detail/61aef05d96a6ccbc6f9c4b15') // id
  }

  return (
    <HomeContainer>
      <Article data="nihao" />
      {channel}
      <div style={{ height: '3000px' }}></div>
      <Button onClick={toDetail}> 测试详情 </Button>
    </HomeContainer>
  )
}

export default Home
