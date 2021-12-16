import React from 'react'
import { Outlet, useParams } from 'react-router'

import RightContainer from './components/right-container'
import UserInfo from './components/base-info'
import ListHeader from './components/headline'

import {
  UserCenterWrapper,
  LeftContainerWrapper,
  ContentWrapper,
} from './style'

export default function UserCenter() {
  const { id } = useParams()
  console.log(id)

  return (
    <UserCenterWrapper>
      <LeftContainerWrapper>
        <UserInfo id={id} />
        <ListHeader />
        <ContentWrapper>
          <Outlet color="A" />
        </ContentWrapper>
      </LeftContainerWrapper>
      <RightContainer />
    </UserCenterWrapper>
  )
}
