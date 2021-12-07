import React, { memo } from 'react'
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

import {
  shiftDate,
  getRange,
  getRandomInt,
  getDaysInfoInYear
} from '../../../../utils/date-format'

import { Select } from 'antd';

import {
  CalendarWrapper,
  TitleWrapper,
  ButtonWrapper
} from './style'

export default memo(function CalendarHotGraph() {
  const { Option } = Select;
  // 该函数用于将每一天对应的date和count，返回的是一年中包含这些数据的新数组；最终是要传递给日历组件的
  const { allDays, endDay } = getDaysInfoInYear()

  // 注意：这个年份不是固定的，我们最好写成是自适应年份的代码，即判断当前的年份，并且要判断出是平年还是闰年，最终再决定这个天数
  const randomValues = getRange(allDays).map((index) => {
    return {
      date: shiftDate(endDay, -index),
      count: getRandomInt(0, 180)
    };
  });
  console.log(randomValues);

  // 用户鼠标经过颜色格子的时候显示颜色对应的范围
  const handleShowNumScope = index => {
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
        <h1 className="title">阅读时间</h1>
        <Select defaultValue="2021" style={{ width: 120 }}>
          <Option value="jack">2021</Option>
        </Select>
      </TitleWrapper>
      <CalendarHeatmap
        startDate={shiftDate(endDay, -365)} // 日历的开始时间，要根据平年闰年计算出往前推的天数
        endDate={endDay} // 结束时间，只需调成每一年的最后一天即可
        values={randomValues} // 记录着每一年每一天的数据
        classForValue={(value) => { // 根据对应的value值决定类名的函数
          const time = value.count
          if (!time) {
            return "color-news-0";
          } else if (time < 20) {
            return `color-news-1`;
          } else if (time < 60) {
            return `color-news-2`;
          } else if (time < 120) {
            return `color-news-3`;
          } else {
            return `color-news-4`;
          }
        }}
        gutterSize={2} // 相对于正方形的大小
        tooltipDataAttrs={(value) => { // 这个回调的参数其实就是对应天数的value值，包含date和count属性
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)}  浏览时间: ${value.count}min`, // 这里toolTip组件要提示的信息
            "rx": 2
          };
        }}
        showWeekdayLabels={true}
      />
      <ButtonWrapper>
        <div className="statistics">
          <span className="all-read-time">最近一年浏览总时间：<span className="num">2356</span> 分钟</span>
          <span className="all-read-time">最长连续登陆时间：<span className="num">326</span> 天</span>
          <span className="all-read-time">最近连续登陆时间: <span className="num">6</span> 天</span>
        </div>
        <div className="color-show-box">
          少
          <div className="color-box">
            {
              [1, 2, 3, 4, 5].map((item, index) => {
                return <div key={index} data-for="showScope" data-tip={handleShowNumScope(index)}></div>
              })
            }
          </div>
          多
        </div>
      </ButtonWrapper>
      <ReactTooltip />
      {/* 给ReactTooltip组件设置的id属性是为了让其能根据data-for属性找到对应的触发元素 */}
      <ReactTooltip id="showScope" />
    </CalendarWrapper>
  );
})


