import React from 'react'
import { Outlet, useParams } from 'react-router'

import RightContainer from './c-cpns/right-container'
import UserInfo from './c-cpns/base-info'
import ListHeader from './c-cpns/headline'

import {
  UserCenterWrapper,
  LeftContainerWrapper,
  ContentWrapper,
} from './style'

export default function UserCenter() {
  return (
    <UserCenterWrapper>
      <LeftContainerWrapper>
        <UserInfo />
        <ListHeader />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </LeftContainerWrapper>
      <RightContainer />
    </UserCenterWrapper>
  )
}
