import React, { memo } from 'react'

import SecondNav from './components/second-nav'

import { ConcernItemWrapper } from './style'
import { Outlet } from 'react-router'

export default memo(function Concern() {
  return (
    <ConcernItemWrapper>
      <SecondNav />
      <Outlet />
    </ConcernItemWrapper>
  )
})
