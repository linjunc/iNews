import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router'

import { userInfoContext } from '../../models/context'
import { getUserInfo } from '../../services/user'

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
  const [userInfo, setUserInfo] = useState({})
  const [isContentShow, setIsContentShow] = useState(true)

  useEffect(() => {
    const getUserInfoFn = async () => {
      const res = await getUserInfo({
        user_id,
      })
      const { code, msg, userInfo } = res.data
      if (code === 200) {
        setUserInfo(userInfo)
      } else {
        message.error(msg)
      }
      setIsContentShow(false)
    }
    getUserInfoFn()
  }, [])

  return (
    <userInfoContext.Provider value={userInfo}>
      <UserCenterWrapper>
        <LeftContainerWrapper>
          <UserInfo id={user_id} />
          <ListHeader />
          <ContentWrapper>
            <Skeleton
              active
              loading={isContentShow}
              paragraph={{ rows: 4 }}
              round={true}
            >
              <Outlet />
            </Skeleton>
          </ContentWrapper>
        </LeftContainerWrapper>
        <RightContainer />
      </UserCenterWrapper>
    </userInfoContext.Provider>
  )
}
