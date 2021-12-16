import React, { useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { SliderWrapper } from './style'

let clickFlag = true
const Slider = ({ dataArray, next, prev }) => {
  const [num, setNum] = useState(5) //轮播所在位置
  const [timer, setTimer] = useState(0) //transition的delay
  const handelTimer = () => {
    //处理delay及flag
    setTimer(0.8)
    let close = setTimeout(() => {
      setTimer(0)
      clearTimeout(close)
      clickFlag = true
    }, 800)
  }
  const backTo = (num) => {
    //改变num以改变位移
    setNum(num)
  }
  const handelClickLeft = () => {
    //检查是否在动画过程
    if (!clickFlag) return
    clickFlag = false
    prev()

    if (num <= 0) {
      backTo(5)
    }
    let beAfter = setTimeout(() => {
      //回到5的位置后继续位移
      setNum((num) => num - 1)
      handelTimer()
      clearTimeout(beAfter)
    }, 0)
  }
  const handelClickRight = () => {
    //检查是否在动画过程
    if (!clickFlag) return
    clickFlag = false
    next()
    if (num > 4) {
      backTo(0)
    }
    let beAfter = setTimeout(() => {
      //回到0的位置后继续位移
      setNum((num) => num + 1)
      handelTimer()
      clearTimeout(beAfter)
    }, 0)
  }
  const sliderArr = dataArray.map((item) => {
    return {
      image_url: item.image_url,
    }
  })
  const [newSliderArr, setNewSliderArr] = useState([
    ...sliderArr,
    ...sliderArr,
    ...sliderArr,
  ])
  return (
    <SliderWrapper>
      <div className="slider_wrapper">
        <LeftOutlined onClick={handelClickLeft} className="left_before" />
        <ul
          style={{
            transform: `translateX(${-90 * num + 'px'})`,
            transition: `all ${timer}s`,
          }}
          className="slider"
        >
          {newSliderArr.map((data, index) => (
            <li className="slider_node" key={data.image_url + Math.random()}>
              <img className="hot_img" src={data.image_url} alt="" />
            </li>
          ))}
        </ul>
        <RightOutlined onClick={handelClickRight} className="right_next" />
      </div>
    </SliderWrapper>
  )
}

export default Slider
