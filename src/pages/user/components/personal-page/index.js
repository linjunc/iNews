import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getUserInfo } from '../../../../services/user'

import CalendarHotGraph from './components/calendar'
import MainPage from './components/main-page'

export default function PersonalPage() {
  const { id: user_id } = useParams()
  // 设置用户信息的状态
  const [userAllInfo, setUserAllInfo] = useState({})

  // 获取到用户信息后更新状态
  useEffect(() => {
    const upDateUserInfo = async () => {
      const res = await getUserInfo({ user_id })
      const newUserAllInfo = res.data.userInfo
      setUserAllInfo(newUserAllInfo)
    }
    upDateUserInfo()
  }, [])

  return (
    <div>
      <MainPage userAllInfo={userAllInfo} />
      <CalendarHotGraph userAllInfo={userAllInfo} />
    </div>
  )
}
