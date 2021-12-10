import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import html2canvas from 'html2canvas'

import PieChart from './c-cpns/pie-chart'
import InstrumentChart from './c-cpns/Instrument-chart'
import BarChart from './c-cpns/bar-chart'

import {
  ReadingReportWrapper,
  TransitionWrapper,
  SecondTitleWrapper,
  MyButton,
} from './style'

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

  const reportRef = useRef()

  const downLoad = () => {
    html2canvas(reportRef.current).then(function (canvas) {
      // 返回的canvas对象中有这么一个属性，里面的toDataURL方法可以将canvas转成图片地址
      const imgUrl = canvas.toDataURL('image/png')
      // 生成一个a元素
      const a = document.createElement('a')
      // 生成一个单击事件
      const event = new MouseEvent('click')
      // 将a的download属性设置为我们想要下载的图片名称
      a.download = 'iNews年度报告总结.png'
      // 将生成的URL设置为a.href属性
      a.href = imgUrl
      // 触发a的单击事件
      a.dispatchEvent(event) // 这样点击了之后就会在本地下载链接上对应的了
    })
  }

  return (
    <TransitionWrapper>
      <SecondTitleWrapper>
        <span className="text">年度报告</span>
        <MyButton onClick={downLoad} type="primary">
          下载年度报告
        </MyButton>
      </SecondTitleWrapper>
      <CSSTransition in={true} classNames="report" timeout={1000} appear={true}>
        <ReadingReportWrapper ref={reportRef}>
          <div className="main-content">
            <img
              src={require('../../../../assets/user-center/report.png').default}
              className="title-img"
              alt="年度报告"
            />
            <PieChart />
            <InstrumentChart />
            <BarChart />
          </div>
        </ReadingReportWrapper>
      </CSSTransition>
    </TransitionWrapper>
  )
}
