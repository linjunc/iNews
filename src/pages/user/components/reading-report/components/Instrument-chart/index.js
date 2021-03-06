import React, { useEffect, useRef, useContext } from 'react'
import * as eCharts from 'echarts'

import { allUserInfoContext } from '../../../../../../models/context'

import AnalyseTitle from '../analyse-title'

import { InstrumentChartWrapper, ContentWrapper } from './style'

export default function InstrumentChart(props) {
  const { readingTimeRank } = props
  // 通过useRef获取图表包裹元素
  const graphRef = useRef()
  const { calendarData } = useContext(allUserInfoContext)

  // 组件挂载到页面上时执行函数为图表配置相关信息
  useEffect(() => {
    const initChart = () => {
      const myChart = eCharts.init(graphRef.current)
      myChart.clear()
      const option = {
        series: [
          {
            type: 'gauge',
            name: '阅读时间',
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d'],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: 'auto',
              },
              length: '55%',
              width: 6,
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2,
              },
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4,
              },
            },
            axisLabel: {
              color: 'auto',
              distance: 5,
              fontSize: 16,
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} min',
              color: 'auto',
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 20,
              },
            },
            data: [
              {
                value: readingTimeRank[0]?.value || 0,
              },
            ],
            max: 800,
          },
        ],
      }
      option && myChart.setOption(option)
    }

    readingTimeRank && initChart()
  }, [readingTimeRank])

  // 计算用户年度浏览总时长
  let userReadingMaxTime = 0
  calendarData.length &&
    calendarData.forEach((item) => {
      userReadingMaxTime += item.count
    })

  return (
    <div>
      <AnalyseTitle infoIndex={1} />
      <ContentWrapper>
        <div className="text-info">
          <p>
            这一年里
            <br />
            您与iNews一起度过了<span>{userReadingMaxTime}</span>分钟
          </p>
          <p>
            您热衷于阅读<span>{readingTimeRank[0]?.name}</span>新闻
            <br />
            在这神秘的领域您总共投入了
            <span>{readingTimeRank[0]?.value || 0}</span>分钟
          </p>
          <p>
            感谢你对我们的<span>支持</span>
            <br />
            iNews才能够不断地进步
          </p>
        </div>
        <InstrumentChartWrapper>
          <div
            ref={graphRef}
            style={{ width: '1000px', height: '480px' }}
          ></div>
        </InstrumentChartWrapper>
      </ContentWrapper>
    </div>
  )
}
