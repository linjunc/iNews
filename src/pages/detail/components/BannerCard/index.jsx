import React from 'react'
import { BannerWrapper } from './style'
import logo from '../../../../assets/logo/logo.png'

const BannerCard = () => {
  return (
    <BannerWrapper>
      <div className="our-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="our-text">
        <div className="our-title">iNews 新闻门户网站</div>
        <div className="our-slogan">更轻、更快、更有趣</div>
        <div className="our-info">欢迎加入我们</div>
      </div>
    </BannerWrapper>
  )
}

export default BannerCard
