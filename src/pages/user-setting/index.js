import React from 'react'
import { Outlet } from 'react-router'

import SettingHeader from './components/header'
import SettingNav from './components/left-nav'

import {
  UserSettingWrapper,
  SettingContainerWrapper,
  RightContainerWrapper,
} from './style'

export default function UserSetting() {
  return (
    <UserSettingWrapper>
      <SettingHeader />
      <SettingContainerWrapper>
        <SettingNav />
        <RightContainerWrapper>
          <Outlet />
        </RightContainerWrapper>
      </SettingContainerWrapper>
    </UserSettingWrapper>
  )
}
