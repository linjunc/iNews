import { Menu } from 'antd'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { NavContainer } from './style'

const { SubMenu } = Menu

const Nav = ({ style }) => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('app')
  const { state } = useLocation()

  // 获取浏览器中的state
  useEffect(() => {
    setCurrent(state?.current ?? 'app')
  }, [state])

  // 函数处理
  const handleClick = (e) => {
    setCurrent(e.key)
    navigate(`/`, { state: { current: e.key } })
  }

  return (
    <NavContainer style={style}>
      <Menu
        className="layout-menu"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="app">热点</Menu.Item>
        <Menu.Item key="recommend">推荐</Menu.Item>
        <Menu.Item key="news_society">社会</Menu.Item>
        <Menu.Item key="news_entertainment">娱乐</Menu.Item>
        <Menu.Item key="news_tech">科技</Menu.Item>
        <Menu.Item key="news_military">军事</Menu.Item>
        <Menu.Item key="news_sports">体育</Menu.Item>
        <Menu.Item key="news_car">汽车</Menu.Item>
        <SubMenu key="SubMenu" title="更多">
          <Menu.Item key="news_finance">财经</Menu.Item>
          <Menu.Item key="news_world">国际</Menu.Item>
          <Menu.Item key="news_fashion">时尚</Menu.Item>
          {/* <Menu.Item key="news_travel">旅游</Menu.Item> */}
          {/* <Menu.Item key="news_discovery">探索</Menu.Item> */}
          {/* <Menu.Item key="news_baby">育儿</Menu.Item> */}
          {/* <Menu.Item key="news_regimen">养生</Menu.Item> */}
          {/* <Menu.Item key="news_story">故事</Menu.Item> */}
          {/* <Menu.Item key="news_essay">美文</Menu.Item> */}
          {/* <Menu.Item key="news_game">游戏</Menu.Item> */}
          <Menu.Item key="news_history">历史</Menu.Item>
          {/* <Menu.Item key="news_food">美食</Menu.Item> */}
          <Menu.Item key="news_legal">政法</Menu.Item>
          <Menu.Item key="news_politics">政治</Menu.Item>
          <Menu.Item key="news_air">航空</Menu.Item>
        </SubMenu>
      </Menu>
    </NavContainer>
  )
}

export default Nav
