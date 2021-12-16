import React from 'react'

import { TitleWrapper } from './style'

export default function AnalyseTitle(props) {
  // 从props中获取父组件传递过来的标识，用于判断显示那一段文字
  const { infoIndex } = props

  // 为每一个模块准备好的标题、诗句和文案
  const infoArr = [
    {
      title: '图表数据分析',
      verse:
        '"朝着太阳生长，做一个温暖的人，不卑不亢，清澈生活，喜对花开花落，笑看云卷云舒。"',
      tipInfo:
        'iNews已经为您生成了年度阅读时间报告，可以通过下图去查看您在iNews上留下的点点滴滴！',
    },
    {
      title: '阅读时间展示',
      verse: '"光如白驹过隙，总有难忘的记忆；四季轮回无声过，唯有你我是知己。"',
      tipInfo:
        '这一年，您和iNews一起走过了很长的路，探索了许多未知的世界！希望明年还能有您的陪伴！',
    },
    {
      title: '年度周报来袭',
      verse: '"未来一年里展望的路，你我仍需带着更高的理想继续付出。"',
      tipInfo:
        'iNews细心的发现总有一个特别的星期，您好像更愿意和我们一起去探索世界！',
    },
  ]

  // 将要展示出来的数据结构出来
  const { title, verse, tipInfo } = infoArr[infoIndex]

  return (
    <TitleWrapper>
      <h1 className="title">{title}</h1>
      <div className="text-container">
        <p>{verse}</p>
        <p>{tipInfo}</p>
      </div>
    </TitleWrapper>
  )
}
