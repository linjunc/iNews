import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useParams } from 'react-router'

import {
  getSpendTimeYearly,
  getUserInfo,
  FocusAuthor,
} from '../../services/user'
import { userInfoContext, calendarDataContext } from '../../models/context'
import { getLocal } from '../../utils/storage'

import { message, Skeleton } from 'antd'
import RightContainer from './components/right-container'
import UserInfo from './components/base-info'
import ListHeader from './components/headline'

import {
  UserCenterWrapper,
  LeftContainerWrapper,
  ContentWrapper,
} from './style'

export default function UserCenter() {
  const { id: user_id } = useParams()
  const [isContentShow, setIsContentShow] = useState(true)
  // 从本地获取用户自己的id，用于判断访问的是否为自己的主页
  const { user_id: self_id } = JSON.parse(getLocal('userInfo'))
  // 管理用户信息和日历热图的数据
  const [contextInfo, setContextInfo] = useState({
    userInfo: {},
    calendarData: [],
  })

  // 请求用户信息和日历热图数据，请求完成后取消loading效果
  useEffect(async () => {
    try {
      const reqArr = [getUserInfo({ user_id }), getSpendTimeYearly({ user_id })]
      const resArr = await Promise.all(reqArr)
      console.log(resArr)
      const { userInfo } = resArr[0].data
      const { data: calendarData } = resArr[1].data
      setContextInfo({
        userInfo,
        calendarData: calendarData
          ? calendarData.map((item) => {
              return {
                date: new Date(item.date),
                count: item.count,
              }
            })
          : [],
      })
    } catch (err) {
      message.error('数据加载失败，请重试!')
    } finally {
      setIsContentShow(false)
    }
  }, [])

  const isSelf = self_id === user_id

  // 点击关注按钮后发送请求关注/取消用户
  const concernUserFn = useCallback(() => {
    console.log(contextInfo)
    setContextInfo({
      userInfo: {
        ...contextInfo.userInfo,
        is_follow: !contextInfo.userInfo.is_follow,
      },
      calendarData: contextInfo.calendarData,
    })
    const concernUser = async () => {
      try {
        const res = await FocusAuthor({ media_id: user_id })
        console.log(res)
      } catch (err) {
        message.error('请求错误，请重试！')
      }
    }
    concernUser()
  }, [contextInfo])
  console.log(contextInfo)
  console.log(90)

  return (
    <userInfoContext.Provider value={contextInfo.userInfo}>
      <calendarDataContext.Provider value={contextInfo.calendarData}>
        <UserCenterWrapper>
          <LeftContainerWrapper>
            <Skeleton
              active
              loading={isContentShow}
              paragraph={{ rows: 4 }}
              round={true}
            >
              <UserInfo isSelf={isSelf} concernUserFn={concernUserFn} />
              <ListHeader isSelf={isSelf} concernUserFn={concernUserFn} />
              <ContentWrapper>
                <Outlet />
              </ContentWrapper>
            </Skeleton>
          </LeftContainerWrapper>
          <RightContainer />
        </UserCenterWrapper>
      </calendarDataContext.Provider>
    </userInfoContext.Provider>
  )
}
