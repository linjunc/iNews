import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

import AnalyseTitle from '../analyse-title'

import { GraphWrapper } from './style'

export default function PieChart() {
  // 通过useRef获取图表包裹元素
  const graphRef = useRef()

  const initChart = () => {
    const myChart = echarts.init(graphRef.current)
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
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        width: 1000,
        textStyle: {
          fontSize: 20, // 左侧选项字体大小,
        },
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            {
              name: '热点类',
              value: 320,
            },
            {
              name: '财经类',
              value: 300,
            },
            {
              name: '科技类',
              value: 290,
            },
            {
              name: '国际类',
              value: 240,
            },
            {
              name: '体育类',
              value: 230,
            },
            {
              name: '娱乐类',
              value: 180,
            },
            {
              name: '数码类',
              value: 160,
            },
            {
              name: '游戏类',
              value: 150,
            },
            {
              name: '时尚类',
              value: 100,
            },
            {
              name: '美食类',
              value: 60,
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    option && myChart.setOption(option)
  }

  // 等到dom渲染到页面之后再执行initChart操作
  useEffect(() => {
    initChart()
  }, [])

  return (
    <div>
      <AnalyseTitle infoIndex={0} />
      <GraphWrapper>
        <div ref={graphRef} style={{ width: '900px', height: '500px' }}></div>
      </GraphWrapper>
    </div>
  )
}
