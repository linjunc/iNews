import React, { useEffect, useState, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { getUserInfo } from '../../services/user'
import { userInfoContext } from '../../models/context'
import { getLocal } from '../../utils/storage'
import { Skeleton } from 'antd'

import SettingHeader from './components/header'
import SettingNav from './components/left-nav'

import {
  UserSettingWrapper,
  SettingContainerWrapper,
  RightContainerWrapper,
} from './style'

export default function UserSetting() {
  const navigate = useNavigate()
  // 存储标志变量用于决定还需不需要发请求
  const flag = useRef(true)
  const { user_id } = JSON.parse(getLocal('userInfo') || '{}')
  const [contextInfo, setContextInfo] = useState({
    userInfo: {},
    isLoading: true,
  })

  // 判断用户有无登录
  useEffect(() => {
    getLocal('token') ||
      (() => {
        flag.current = false
        navigate('/login')
      })()
  }, [navigate])

  // 获取用户信息
  useEffect(() => {
    const getInfo = async () => {
      if (flag.current) {
        const { data } = await getUserInfo({ user_id })
        setContextInfo({
          isLoading: false,
          userInfo: data.userInfo,
        })
      }
    }
    getInfo()
  }, [user_id])

  return (
    <userInfoContext.Provider
      value={{ userInfo: contextInfo.userInfo, setStateFn: setContextInfo }}
    >
      <UserSettingWrapper>
        <SettingHeader />
        <SettingContainerWrapper>
          <SettingNav />
          <RightContainerWrapper>
            <Skeleton active loading={contextInfo.isLoading} round={true}>
              <Outlet />
            </Skeleton>
          </RightContainerWrapper>
        </SettingContainerWrapper>
      </UserSettingWrapper>
    </userInfoContext.Provider>
  )
}
