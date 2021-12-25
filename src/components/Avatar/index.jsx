import { Dropdown, Avatar as AntdAvatar, Menu, Modal, message } from 'antd'
import { LoginButton } from './style.js'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { userContext } from '../../models/context'
import { DELETE_INFO } from '../../models/constant'

const Avatar = ({ color }) => {
  const { userInfo, userDispatch } = useContext(userContext)
  const navigate = useNavigate()

  // 路由跳转，去个人中心
  const toUser = () => {
    navigate(`/user/${userInfo.user_id}`)
  }
  // 路由跳转，去登录页
  const toLogin = () => {
    navigate('/login')
  }
  // 路由跳转，去疫情地图
  const toCovid = () => {
    navigate('/covidMap')
  }
  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '你确定要退出账号吗？退出后有些服务无法享受噢~',
      onOk: () => {
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        message.success('退出成功')
        // 更新context 中的数据
        userDispatch({
          type: DELETE_INFO,
        })
      },
    })
  }
  // 下拉菜单
  const menu = (
    <Menu
      style={{ width: '110px', textAlign: 'center', backgroundColor: color }}
    >
      <Menu.Item onClick={toUser} key="0">
        <span>个人中心</span>
      </Menu.Item>
      <Menu.Item onClick={toCovid} key="1">
        <span>肺炎地图</span>
      </Menu.Item>
      <Menu.Item onClick={logout} key="2">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {userInfo && userInfo.avatar ? (
        <Dropdown arrow={true} overlay={menu} placement="bottomCenter">
          <AntdAvatar style={{ cursor: 'pointer' }} src={userInfo.avatar} />
        </Dropdown>
      ) : (
        <LoginButton type="primary" onClick={toLogin}>
          登录
        </LoginButton>
      )}
    </>
  )
  // // 已登录
  // if (userInfo) {

  //   return (
  //     <Dropdown arrow={true} overlay={menu} placement="bottomCenter">
  //       <AntdAvatar style={{ cursor: 'pointer' }} src={userInfo.avatar} />
  //     </Dropdown>
  //   )
  // }
  // // 未登录
  // else {
  //   return (
  //     <LoginButton type="primary" onClick={toLogin}>
  //       登录
  //     </LoginButton>
  //   )
  // }
}

export default Avatar
