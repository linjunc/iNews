import React, { memo } from 'react'

import CalendarHotGraph from './c-cpns/calendar'
import MainPage from './c-cpns/main-page'

export default function PersonalPage() {
  return (
    <div>
      <MainPage />
      <CalendarHotGraph />
    </div>
  )
}
