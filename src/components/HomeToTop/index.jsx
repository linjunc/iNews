import React, { useRef, useState } from 'react'
import { Popover } from 'antd'
import wing from '../../assets/home/wing.png'
import guLi from '../../assets/home/guli.webp'

import { ToTopWrapper } from './style'
import dayjs from 'dayjs'
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const HomeToTop = () => {
  const [finish, setFinish] = useState(false)
  const imgRef = useRef(null)
  const handleTop = () => {
    setFinish(true)
    let scrollTopTimer = setInterval(function () {
      let top = document.body.scrollTop || document.documentElement.scrollTop
      let speed = top / 30
      document.documentElement.scrollTop -= speed
      if (top === 0) {
        clearInterval(scrollTopTimer)
        setFinish(false)
      }
    }, 5)
  }
  return (
    <ToTopWrapper>
      <img src={wing} alt="wing" className={finish ? 'wing show' : 'wing'} />
      <Popover
        content={`您本次阅读时间已达 ${(
          sessionStorage.getItem('timing') / 60000
        )?.toFixed(0)} 分钟`}
      >
        <img
          ref={imgRef}
          onMouseOver={() => {
            imgRef.current.src = guLi
          }}
          onClick={() => {
            handleTop(true)
          }}
          src={guLi}
          alt="guLi"
          className="guLi"
        />
      </Popover>
    </ToTopWrapper>
  )
}

export default HomeToTop
