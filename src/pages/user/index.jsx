import React, { useState } from 'react'

import CalendarHotGraph from './c-cpns/calendar'
import ReadingReport from './c-cpns/reading-report'
import { Button } from 'antd'
 
import { UserCenterWrapper } from './style'

export default function DCCUserCenter() {
    const [nowState, setNowState] = useState(false)

    return (
        <UserCenterWrapper>
            <Button onClick={e => setNowState(!nowState)}>切换组件</Button>
            {
                nowState ? <CalendarHotGraph /> : <ReadingReport />
            }
        </UserCenterWrapper>
    )
}
