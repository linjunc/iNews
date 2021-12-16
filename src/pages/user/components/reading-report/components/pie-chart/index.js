import React, { useEffect, useRef } from 'react'
import * as eCharts from 'echarts'

import { lazyLoad } from '../../../../../../utils/optimize-fn'
import { throttle } from 'lodash'

import AnalyseTitle from '../analyse-title'

import { GraphWrapper } from './style'

export default function PieChart() {
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
    window.addEventListener('scroll', lazyFn)
    return () => {
      window.removeEventListener('scroll', lazyFn)
    }
  }, [lazyFn])

  return (
    <div>
      <AnalyseTitle infoIndex={0} />
      <GraphWrapper>
        <div ref={graphRef} style={{ width: '900px', height: '500px' }}></div>
      </GraphWrapper>
    </div>
  )
}
