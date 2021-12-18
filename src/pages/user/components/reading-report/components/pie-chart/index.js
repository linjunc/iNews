import React, { useEffect, useRef } from 'react'
import * as eCharts from 'echarts'

import { lazyLoad } from '../../../../../../utils/optimize-fn'
import { throttle } from 'lodash'

import { Empty } from 'antd'
import AnalyseTitle from '../analyse-title'

import { GraphWrapper } from './style'

export default function PieChart(props) {
  const { readingTimeRank } = props
  // 通过useRef获取图表包裹元素
  const graphRef = useRef()

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
          data: readingTimeRank,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
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
    // 图表开始渲染之后取消鼠标滚动事件
    window.removeEventListener('scroll', lazyFn) // 执行了initChart函数后就可以取消监听事件了
  }

  // 将懒加载函数用节流函数包裹一层用于优化
  const lazyFn = throttle(lazyLoad(graphRef, initChart), 200)

  // 等到dom渲染到页面之后再执行initChart操作
  useEffect(() => {
    if (readingTimeRank.length) {
      window.addEventListener('scroll', lazyFn)
      return () => {
        window.removeEventListener('scroll', lazyFn)
      }
    }
  }, [lazyFn, readingTimeRank])

  return (
    <div>
      <AnalyseTitle infoIndex={0} />
      {readingTimeRank.length ? (
        <GraphWrapper>
          <div ref={graphRef} style={{ width: '900px', height: '500px' }}></div>
        </GraphWrapper>
      ) : (
        <Empty description="您暂时还没有阅读记录哦！" />
      )}
    </div>
  )
}
