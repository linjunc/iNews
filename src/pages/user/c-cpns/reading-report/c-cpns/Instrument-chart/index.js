import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

import AnalyseTitle from '../analyse-title'

import { InstrumentChartWrapper, ContentWrapper } from './style'

export default function InstrumentChart() {
  // 通过useRef获取图表包裹元素
  const graphRef = useRef()
  // 假定给用户的单日最大阅读数
  const userReadingMaxTime = 320

  const initChart = () => {
    const myChart = echarts.init(graphRef.current)
    myChart.clear()
    const option = {
      series: [
        {
          type: 'gauge',
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
            distance: 40,
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
              value: userReadingMaxTime,
            },
          ],
          max: 480, // 这个是按照用户每天浏览网站8小时计算出的单日使用最长时间量程
        },
      ],
    }
    option && myChart.setOption(option)
  }

  // 组件挂载到页面上时执行函数为图表配置相关信息
  useEffect(() => {
    initChart()
  }, [])

  return (
    <div>
      <AnalyseTitle infoIndex={1} />
      <ContentWrapper>
        <div className="text-info">
          <p>
            这一年里
            <br />
            您与iNews一起度过了<span>32154</span>分钟
          </p>
          <p>
            您热衷于阅读<span>热点类</span>新闻
            <br />
            在这神秘的领域您总共投入了<span>320</span>分钟
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
