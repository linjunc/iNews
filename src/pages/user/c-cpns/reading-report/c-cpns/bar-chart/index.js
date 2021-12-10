import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

import {
  getMonthAndDay,
  getLongestWeek,
} from '../../../../../../utils/date-format'
import { lazyload } from '../../../../../../utils/optimize-fn'
import { throttle } from 'lodash'

import AnalyseTitle from '../analyse-title'

import { GraphWrapper, TextInfoWrapper } from './style'

export default function BarChart() {
  // 使用useRef创造出的实例获取柱状图所对应的dom元素
  const graphRef = useRef()

  // 初始化柱状图的信息以及进行相关配置
  const initChart = () => {
    const myChart = echarts.init(graphRef.current)
    myChart.clear()

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '阅读时间（单位: 分钟）',
          type: 'bar',
          barWidth: '60%',
          data: dataArr,
        },
      ],
      color: '#37a2da',
    }
    option && myChart.setOption(option)
    window.removeEventListener('scroll', lazyFn)
  }

  // 将懒加载函数用节流函数包裹一层用于优化
  const lazyFn = throttle(lazyload(graphRef, initChart), 200)

  // 组件挂载到页面上时执行函数为图表配置相关信息
  useEffect(() => {
    window.addEventListener('scroll', lazyFn)
    return () => {
      window.removeEventListener('scroll', lazyFn)
    }
  }, [lazyFn])

  // 从本地获取到虚拟数据（后面会改为从服务器获取）并将数组反转方便后续操作
  const randomValues =
    JSON.parse(localStorage.getItem('randomValues'))?.reverse() || []
  // 获取到最大阅读时间周末的起始日期、结束日期、阅读时间总和以及阅读时间数组
  const { startDay, endDay, maxTime, dataArr } =
    getLongestWeek(randomValues) || {}

  // 获取最大阅读周的起始日期（几月几日）
  const { day: firstBeginDay, month: firstStartMonth } =
    (startDay && getMonthAndDay(startDay)) || {}
  // 获取最大阅读周的结束日期（几月几日）
  const { day: secondBeginDay, month: secondEndMonth } =
    (endDay && getMonthAndDay(endDay)) || {}

  return (
    <div>
      <AnalyseTitle infoIndex={2} />
      <TextInfoWrapper>
        <p>
          <span>{firstStartMonth}</span>月<span>{firstBeginDay}</span>日 ～{' '}
          <span>{secondEndMonth}</span>月<span>{secondBeginDay}</span>
          日大概是很特别的一周
          <br />
          这一周里，您的阅读频率明显高于其他时间段
        </p>
        <p>
          您共花费了<span>{maxTime}</span>分钟
          <br />
          在iNews的世界里面遨游
        </p>
        <p>
          iNews很荣幸能够将继续和您一起
          <br />去<span>探索</span>这未知世界中的每一个角落
        </p>
      </TextInfoWrapper>
      <GraphWrapper>
        <div ref={graphRef} style={{ width: '1000px', height: '500px' }}></div>
      </GraphWrapper>
    </div>
  )
}
