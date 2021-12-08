import React from 'react'
import LoveButton from '../../../../components/LoveButton'
import { backToTop } from '../../../../utils/backToTop'

const BackToTop = () => {
  // 回到顶部 动画
  return (
    <LoveButton handleClick={backToTop} key="top" content="回到顶部" type={4} />
  )
}

export default BackToTop
