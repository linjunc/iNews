import React, { memo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import ReportGraph from './c-cpns/report-graph'

import {
  ReadingReportWrapper,
  CategoryRankWrapper,
  TransitionWrapper
} from './style'

export default function ReadingReport() {
  // 用户年度总结阅读时间排行榜
  const [readTimeArr, setReadTimeArr] = useState([
    {
      title: '热点类',
      readTime: 320
    },
    {
      title: '财经类',
      readTime: 300
    },
    {
      title: '科技类',
      readTime: 290
    },
    {
      title: '国际类',
      readTime: 240
    },
    {
      title: '体育类',
      readTime: 230
    },
    {
      title: '娱乐类',
      readTime: 180
    },
    {
      title: '数码类',
      readTime: 160
    },
    {
      title: '游戏类',
      readTime: 150
    },
    {
      title: '时尚类',
      readTime: 100
    },
    {
      title: '美食类',
      readTime: 60
    }
  ])

  // 获取最多的阅读时间
  const maxTime = readTimeArr[0].readTime

  // 根据最大阅读时间计算每个柱状图长度的函数
  const calculated = readTime => readTime / maxTime * 650 + 'px'

  return (
    <TransitionWrapper>
      <CSSTransition in={true}
        classNames="report"
        timeout={1000}
        appear={true}
      >
        <ReadingReportWrapper>
          <div className="main-content">
            <div className="title-img"></div>
            <ReportGraph />
            {/* <CategoryRankWrapper>
              {
                readTimeArr.map((item, index) => {
                  const { title, readTime } = item
                  return (
                    <div key={title}>
                      <span className="category">{`${index + 1}. ${title}`}</span>
                      <div className="bar-chart">
                        <div className="num" style={{ width: calculated(readTime) }}>{`${readTime} min`}</div>
                      </div>
                    </div>
                  )
                })
              }
            </CategoryRankWrapper> */}
          </div>
        </ReadingReportWrapper>
      </CSSTransition>
    </TransitionWrapper>
  )
}
