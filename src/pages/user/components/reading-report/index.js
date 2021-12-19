import React, { useRef, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import html2canvas from 'html2canvas'
import { useParams } from 'react-router'

import { getReadingTimeRank } from '../../../../services/user'

import PieChart from './components/pie-chart'
import InstrumentChart from './components/Instrument-chart'
import BarChart from './components/bar-chart'
import { message } from 'antd'

import {
  ReadingReportWrapper,
  TransitionWrapper,
  SecondTitleWrapper,
  MyButton,
} from './style'

export default function ReadingReport() {
  const { id: user_id } = useParams()
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

  // 用户年度总结阅读时间排行榜
  const [readingTimeRank, setReadingTimeRank] = useState([])

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

  useEffect(async () => {
    try {
      const res = await getReadingTimeRank({ user_id })
      res.data?.data && setReadingTimeRank(res.data.data)
    } catch (err) {
      message('请求失败，请刷新页面重试！')
    }
  }, [])

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
            <PieChart readingTimeRank={readingTimeRank} />
            <InstrumentChart readingTimeRank={readingTimeRank} />
            <BarChart />
          </div>
        </ReadingReportWrapper>
      </CSSTransition>
    </TransitionWrapper>
  )
}
