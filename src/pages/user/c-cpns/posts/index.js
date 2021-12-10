import React, { memo } from 'react'

import CalendarHotGraph from '../calendar'

export default memo(function Posts() {
  return (
    <div style={{ height: '1000px' }}>
      <CalendarHotGraph />
    </div>
  )
})
