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
  const { id } = useParams()
  return (
    <UserCenterWrapper>
      <LeftContainerWrapper>
        <UserInfo />
        <ListHeader id={id} />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </LeftContainerWrapper>
      <RightContainer />
    </UserCenterWrapper>
  )
}
