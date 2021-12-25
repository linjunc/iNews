import React, { useState, useEffect, useContext, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useParams } from 'react-router'

import { getReadingTimeRank } from '../../../../services/user'
import { allUserInfoContext } from '../../../../models/context'

import { message } from 'antd'
import PieChart from './components/pie-chart'
import InstrumentChart from './components/Instrument-chart'
import BarChart from './components/bar-chart'

import { ReadingReportWrapper, TransitionWrapper } from './style'

export default function ReadingReport() {
  const { id: user_id } = useParams()
  const reportRef = useRef()
  // 从context中获取到记录dom元素的方法
  const { getReportDom } = useContext(allUserInfoContext)
  // 用户年度总结阅读时间排行榜
  const [readingTimeRank, setReadingTimeRank] = useState([])

  useEffect(() => {
    const getReadingTime = async () => {
      try {
        const res = await getReadingTimeRank({ user_id })
        res.data?.data && setReadingTimeRank(res.data.data)
      } catch (err) {
        message.error('请求失败，请刷新页面重试！')
      }
    }
    getReadingTime()
  }, [user_id])

  // 因为下载按钮不在组件中，所以必须要把对应的dom元素传递出去进行操作
  useEffect(() => {
    getReportDom && getReportDom(reportRef.current)
  }, [getReportDom])

  return (
    <TransitionWrapper>
      <CSSTransition in={true} classNames="report" timeout={1000} appear={true}>
        <ReadingReportWrapper ref={reportRef}>
          <div className="main-content">
            <img
              src={require('../../../../assets/user-center/report.png').default}
              className="title-img"
              alt="年度报告"
            />
            <PieChart readingTimeRank={readingTimeRank} />
            <InstrumentChart readingTimeRank={readingTimeRank} />
            <BarChart />
          </div>
        </ReadingReportWrapper>
      </CSSTransition>
    </TransitionWrapper>
  )
}
