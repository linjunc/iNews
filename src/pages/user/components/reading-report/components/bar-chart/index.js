import React, { useRef, useEffect, useContext } from 'react'
import * as eCharts from 'echarts'

import {
  getMonthAndDay,
  getLongestWeek,
  getDaysInfoInYear,
  getAllDays,
} from '../../../../../../utils/date-format'
import { lazyLoad } from '../../../../../../utils/optimize-fn'
import { allUserInfoContext } from '../../../../../../models/context'
import { throttle } from 'lodash'

import { Empty } from 'antd'
import AnalyseTitle from '../analyse-title'

import { GraphWrapper, TextInfoWrapper } from './style'

export default function BarChart() {
  let { calendarData } = useContext(allUserInfoContext)
  // 使用useRef创造出的实例获取柱状图所对应的dom元素
  const graphRef = useRef()

  // 初始化柱状图的信息以及进行相关配置
  const initChart = () => {
    const myChart = eCharts.init(graphRef.current)
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
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(96, 92, 86, 1)',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: 'red',
            },
          },
          axisLabel: {
            color: 'rgba(96, 92, 86, 1)',
          },
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
  const lazyFn = throttle(lazyLoad(graphRef, initChart), 200)

  // 组件挂载到页面上时执行函数为图表配置相关信息
  useEffect(() => {
    if (calendarData.length) {
      window.addEventListener('scroll', lazyFn)
      return () => {
        window.removeEventListener('scroll', lazyFn)
      }
    }
  }, [lazyFn, calendarData])

  // 下方代码主要是得到分析数据的
  // 该函数用于获取当前年份并返回一年中的总天数和结束日期等数据
  const { allDays, endDay: lastDay } = getDaysInfoInYear()
  // 返回一个从一年第一天到最后一天的数组
  let initAllDaysArr = getAllDays(allDays, lastDay).reverse()
  // 由于后台返回的时间并没有按照我们想要的时间顺序排列，所以这里要将响应结果排序
  calendarData.sort((obj1, obj2) => {
    return obj1.date - obj2.date
  })
  // 将排序好的数据数组里的日期对应一个数组
  const dateArr = calendarData.map((item) => {
    return item.date.getTime()
  })
  // 将排序好的数据数组里的阅读时间对应一个数组
  const countArr = calendarData.map((item) => {
    return item.count
  })
  let counter = 0
  // 更换初始数据的值
  initAllDaysArr.forEach((item, index) => {
    if (dateArr.includes(item.date.getTime())) {
      const targetObj = initAllDaysArr[index]
      targetObj.count = countArr[counter++]
    }
  })

  // 下方代码主要是分析数据的
  // 获取到最大阅读时间周末的起始日期、结束日期、阅读时间总和以及阅读时间数组
  const { startDay, endDay, maxTime, dataArr } =
    getLongestWeek(initAllDaysArr) || {}
  // 获取最大阅读周的起始日期（几月几日）
  const { day: firstBeginDay, month: firstStartMonth } =
    (startDay && getMonthAndDay(startDay)) || {}
  // 获取最大阅读周的结束日期（几月几日）
  const { day: secondBeginDay, month: secondEndMonth } =
    (endDay && getMonthAndDay(endDay)) || {}

  return (
    <div>
      <AnalyseTitle infoIndex={2} />
      {calendarData.length ? (
        <>
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
            <div
              ref={graphRef}
              style={{ width: '1000px', height: '500px' }}
            ></div>
          </GraphWrapper>
        </>
      ) : (
        <Empty description="您暂时还没有阅读数据哦！" />
      )}
    </div>
  )
}
