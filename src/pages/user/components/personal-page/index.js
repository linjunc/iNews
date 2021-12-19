import React, { memo } from 'react'

import CalendarHotGraph from './components/calendar'
import MainPage from './components/main-page'

export default memo(function PersonalPage() {
  return (
    <div>
      <MainPage />
      <CalendarHotGraph />
    </div>
  )
})
