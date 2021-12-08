import React, { memo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import html2canvas from 'html2canvas'

import { Button } from 'antd'
import PieChart from './c-cpns/pie-chart'
import InstrumentChart from './c-cpns/Instrument-chart'
import BarChart from './c-cpns/bar-chart'

import { ReadingReportWrapper, TransitionWrapper } from './style'

export default function ReadingReport() {
  // 用户年度总结阅读时间排行榜
  const [readTimeArr, setReadTimeArr] = useState([
    {
      title: '热点类',
      readTime: 320,
    },
    {
      title: '财经类',
      readTime: 300,
    },
    {
      title: '科技类',
      readTime: 290,
    },
    {
      title: '国际类',
      readTime: 240,
    },
    {
      title: '体育类',
      readTime: 230,
    },
    {
      title: '娱乐类',
      readTime: 180,
    },
    {
      title: '数码类',
      readTime: 160,
    },
    {
      title: '游戏类',
      readTime: 150,
    },
    {
      title: '时尚类',
      readTime: 100,
    },
    {
      title: '美食类',
      readTime: 60,
    },
  ])

  const ref = useRef()

  const downLoad = () => {
    console.log(ref)
    html2canvas(ref.current).then(function (canvas) {
      console.log(canvas)
      // const imgUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'); // 获取生成的图片的url
      const imgUrl = canvas.toDataURL('image/png')
      console.log(imgUrl)
      // 生成一个a元素
      const a = document.createElement('a')
      // 建一个单击事件
      const event = new MouseEvent('click')
      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      a.download = 'iNews年度报告总结'
      // 将生成的URL设置为a.href属性
      a.href = imgUrl
      // 触发a的单击事件
      a.dispatchEvent(event)
      // document.body.appendChild(canvas);
    })
  }

  return (
    <TransitionWrapper>
      <Button onClick={downLoad}>下载图片</Button>
      <CSSTransition in={true} classNames="report" timeout={1000} appear={true}>
        <ReadingReportWrapper ref={ref}>
          <div className="main-content">
            <div className="title-img"></div>
            <PieChart />
            <InstrumentChart />
            <BarChart />
          </div>
        </ReadingReportWrapper>
      </CSSTransition>
    </TransitionWrapper>
  )
}
