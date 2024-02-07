import React, { memo, useState, useEffect, useContext, useMemo } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import ReactTooltip from 'react-tooltip'

import {
  shiftDate,
  getDaysInfoInYear,
  getAllDays,
} from '../../../../../../utils/date-format'
import { allUserInfoContext } from '../../../../../../models/context'

import { Select } from 'antd'

import { CalendarWrapper, TitleWrapper, ButtonWrapper } from './style'

const { Option } = Select
export default memo(function CalendarHotGraph() {
  // 从context中获取到日历热图所需要的数据并将状态保存下来
  const { calendarData: yearlyData } = useContext(allUserInfoContext)
  const [calendarData, setCalendarData] = useState(yearlyData)
  // 在日历热图下方要展示的数据状态
  const [showTimeDate, setShowTimeDate] = useState({
    recentlyLoginTime: 0,
    longestLoginTime: 0,
    allReadingTime: 0,
  })

  // 该函数用于将每一天对应的date和count，返回的是一年中包含这些数据的新数组；最终是要传递给日历组件的
  // 注意：返回的时间类型为对象，所以不用useMemo直接作为useEffect依赖的时候每次组件渲染都会执行函数
  const { allDays, endDay } = useMemo(() => getDaysInfoInYear(), [])

  // 当context传递过来的数据改变时，需要更新状态;由于后台只返回
  useEffect(() => {
    let initAllDaysArr = getAllDays(allDays, endDay)
    const len = yearlyData.length
    if (len) {
      // 获取初始化数组
      const copyYearlyData = [...yearlyData]
      // 赋值时用的计数器变量
      let counter = 0
      // 用于记录用户年度阅读总时长的变量，
      let allReadingTime = 0
      // 用于记录用户年度最长登录时间的变量，
      let longestLoginTime = 0
      let maxLongestLoginTime = 0
      // 用于记录用户年度最近最长登录时间的变量以及是否继续记录的标志
      let recentlyLoginTime = 0
      let flag = true
      // 由于后台返回的时间并没有按照我们想要的时间顺序排列，所以这里要将响应结果排序
      copyYearlyData.sort((obj1, obj2) => {
        return obj2.date - obj1.date
      })
      // 将排序好的数据数组里的日期对应一个数组
      const dateArr = copyYearlyData.map((item) => {
        allReadingTime += item.count
        return item.date.getTime()
      })
      // 将排序好的数据数组里的阅读时间对应一个数组
      const countArr = copyYearlyData.map((item) => {
        return item.count
      })

      initAllDaysArr.forEach((item, index) => {
        if (dateArr.includes(item.date.getTime())) {
          const targetObj = initAllDaysArr[index]
          targetObj.count = countArr[counter++]
          longestLoginTime++
          flag && recentlyLoginTime++
          maxLongestLoginTime = Math.max(maxLongestLoginTime, longestLoginTime)
        } else {
          longestLoginTime = 0
          if (maxLongestLoginTime) {
            flag = false
          }
        }
      })
      setShowTimeDate({
        recentlyLoginTime,
        longestLoginTime: maxLongestLoginTime,
        allReadingTime,
      })
    }
    // 无论数组长度是否为0都要更新状态
    setCalendarData(initAllDaysArr)
  }, [yearlyData, allDays, endDay])

  // 用户鼠标经过颜色格子的时候显示颜色对应的范围
  const handleShowNumScope = (index) => {
    switch (index) {
      case 0:
        return '0 min'
      case 1:
        return '0 ~ 20 min'
      case 2:
        return '20 ~ 60 min'
      case 3:
        return '60 ~ 120 min'
      case 4:
        return '超过120 min'
      default:
        return '0 min'
    }
  }

  return (
    <CalendarWrapper>
      <TitleWrapper>
        <h1 className="title">阅读日历</h1>
        <Select defaultValue="2024" style={{ width: 120 }}>
          <Option>2024</Option>
        </Select>
      </TitleWrapper>
      <CalendarHeatmap
        startDate={shiftDate(endDay, -allDays)} // 日历的开始时间，要根据平年闰年计算出往前推的天数
        endDate={endDay} // 结束时间，只需调成每一年的最后一天即可
        values={calendarData} // 记录着每一年每一天的数据
        classForValue={(value) => {
          // 根据对应的value值决定类名的函数
          const time = value && value.count
          if (!time) {
            return 'color-news-0'
          } else if (time < 20) {
            return `color-news-1`
          } else if (time < 60) {
            return `color-news-2`
          } else if (time < 120) {
            return `color-news-3`
          } else {
            return `color-news-4`
          }
        }}
        gutterSize={2} // 相对于正方形的大小
        tooltipDataAttrs={(value) => {
          // 这个回调的参数其实就是对应天数的value值，包含date和count属性
          return {
            'data-tip': `${
              (value.date && value.date.toISOString().slice(0, 10)) || ''
            }  浏览时间: ${value.count}min`, // 这里toolTip组件要提示的信息
            rx: 2,
            width: '12px',
            height: '12px',
          }
        }}
        showWeekdayLabels={true}
      />
      <ButtonWrapper>
        <div className="statistics">
          <span className="all-read-time">
            最近连续登陆时间:{' '}
            <span className="num">{showTimeDate.recentlyLoginTime}</span> 天
          </span>
          <span className="all-read-time">
            最长连续登陆时间：
            <span className="num">{showTimeDate.longestLoginTime}</span> 天
          </span>
          <span className="all-read-time">
            最近一年浏览总时间：
            <span className="num">{showTimeDate.allReadingTime}</span> 分钟
          </span>
        </div>
        <div className="color-show-box">
          少
          <div className="color-box">
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div
                  key={index}
                  data-for="showScope"
                  data-tip={handleShowNumScope(index)}
                ></div>
              )
            })}
          </div>
          多
        </div>
      </ButtonWrapper>
      <ReactTooltip />
      {/* 给ReactTooltip组件设置的id属性是为了让其能根据data-for属性找到对应的触发元素 */}
      <ReactTooltip id="showScope" />
    </CalendarWrapper>
  )
})
