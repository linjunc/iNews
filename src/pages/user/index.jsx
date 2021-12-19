import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'

import {
  getSpendTimeYearly,
  getUserInfo,
  FocusAuthor,
} from '../../services/user'
import { allUserInfoContext } from '../../models/context'
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
  const navigate = useNavigate()
  // 存储标志变量用于决定还需不需要发请求
  const flag = useRef(true)
  // 从本地获取用户自己的id，用于判断访问的是否为自己的主页
  const { user_id: self_id } = JSON.parse(getLocal('userInfo') || '{}')
  const [isContentShow, setIsContentShow] = useState(true)
  // 管理用户信息和日历热图的数据
  const [contextInfo, setContextInfo] = useState({
    userInfo: {},
    calendarData: [],
    isFollow: false,
  })

  // 判断用户本地有无token，看是否需要跳转到登录页
  useEffect(() => {
    getLocal('token') ||
      (() => {
        flag.current = false
        navigate('/login')
      })()
  }, [])

  // 请求用户信息和日历热图数据，请求完成后取消loading效果
  useEffect(async () => {
    if (flag.current) {
      setIsContentShow(true)
      try {
        const reqArr = [
          getUserInfo({ user_id }),
          getSpendTimeYearly({ user_id }),
        ]
        const resArr = await Promise.all(reqArr)
        const { userInfo, is_follow } = resArr[0].data
        const { data: calendarData } = resArr[1].data
        console.log(resArr)
        setContextInfo({
          isFollow: is_follow,
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
      }
    }
    setIsContentShow(false)
  }, [user_id])

  const isSelf = self_id === user_id

  // 点击关注按钮后发送请求关注/取消用户;注意：依赖一定要写对，否则可能会因为闭包而造成问题
  const concernUserFn = useCallback(() => {
    setContextInfo({
      ...contextInfo,
      isFollow: !contextInfo.isFollow,
    })
    const concernUser = async () => {
      try {
        await FocusAuthor({ media_id: user_id })
      } catch (err) {
        message.error('请求错误，请重试！')
      }
    }
    concernUser()
  }, [contextInfo, user_id])

  return (
    <allUserInfoContext.Provider value={contextInfo}>
      <UserCenterWrapper>
        <LeftContainerWrapper>
          <Skeleton
            active
            loading={isContentShow}
            paragraph={{ rows: 4 }}
            round={true}
          >
            <UserInfo isSelf={isSelf} concernUserFn={concernUserFn} />
            <ListHeader
              isSelf={isSelf}
              avatar={contextInfo.userInfo.avatar}
              concernUserFn={concernUserFn}
              isShowHistory={contextInfo.userInfo.is_show_history}
            />
            <ContentWrapper>
              <Outlet />
            </ContentWrapper>
          </Skeleton>
        </LeftContainerWrapper>
        <RightContainer isSelf={isSelf} userInfo={contextInfo.userInfo} />
      </UserCenterWrapper>
    </allUserInfoContext.Provider>
  )
}
