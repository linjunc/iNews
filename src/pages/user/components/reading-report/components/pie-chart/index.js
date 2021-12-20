import React, { useEffect, useRef } from 'react'
import * as eCharts from 'echarts'

import { Empty } from 'antd'
import AnalyseTitle from '../analyse-title'

import { GraphWrapper } from './style'

export default function PieChart(props) {
  // 通过useRef获取图表包裹元素
  const graphRef = useRef()
  let { readingTimeRank } = props
  if (readingTimeRank.length > 10) {
    const sliceBeforeArr = readingTimeRank.slice(0, 6)
    const sliceAfterArr = readingTimeRank.slice(6)
    let elseValue = 0
    sliceAfterArr.forEach((item) => {
      elseValue += item.value
    })
    readingTimeRank = [...sliceBeforeArr, { name: '其他', value: elseValue }]
  }

  const initChart = () => {
    const myChart = eCharts.init(graphRef.current)
    myChart.clear()
    const option = {
      title: {
        text: '新闻类别阅读时间',
        textStyle: {
          fontSize: 24, // 主标题颜色大小
        },
        subtextStyle: {
          fontSize: 18, // 副标题颜色大小
        },
        subtext: '单位：分钟',
        left: 'center',
        padding: [50, 20, 100, 100],
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        width: 1000,
        textStyle: {
          fontSize: 18, // 左侧选项字体大小,
          color: '#000',
          lineHeight: 27,
        },
        padding: [120, 0, 0, 0],
      },
      series: [
        {
          name: '阅读时间',
          type: 'pie',
          radius: '50%',
          data: readingTimeRank,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          hoverOffset: 6,
        },
      ],
      color: [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#5470c6',
      ],
    }
    option && myChart.setOption(option)
  }

  // 等到dom渲染到页面之后再执行initChart操作
  useEffect(() => {
    readingTimeRank?.length && initChart()
  }, [readingTimeRank])

  return (
    <div>
      <AnalyseTitle infoIndex={0} />
      {readingTimeRank?.length ? (
        <GraphWrapper>
          <div ref={graphRef} style={{ width: '900px', height: '500px' }}></div>
        </GraphWrapper>
      ) : (
        <Empty description="您暂时还没有阅读记录哦！" />
      )}
    </div>
  )
}
