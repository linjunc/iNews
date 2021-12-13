import React, { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
const Slider = ({ dataArray, next, prev }) => {
  const sliderArr = dataArray.map((item) => {
    return {
      image_url: item.image_url,
      isHidden: false,
    }
  })
  const [newSliderArr, setNewSliderArr] = useState([
    ...sliderArr,
    ...sliderArr,
    ...sliderArr,
  ])
  const [index, setIndex] = useState(0)
  useEffect(() => {
    return () => {}
  }, [index])
  return (
    <div className="slider_wrapper">
      <LeftOutlined
        onClick={() => {
          prev()
          setIndex(index - 1)
          setNewSliderArr((value) => {
            const arrTemp = [...value]
            let node = arrTemp.pop()
            arrTemp.unshift(node)
            return arrTemp
          })
        }}
        className="left_before"
      />
      <ul className="slider">
        {newSliderArr.map((data, index) => (
          <li
            className="slider_node"
            style={{ display: index >= 8 ? 'none' : '' }}
            key={index}
          >
            <img className="hot_img" src={data.image_url} alt="" />
          </li>
        ))}
      </ul>
      <RightOutlined
        onClick={() => {
          next()
          setIndex(index + 1)
          setNewSliderArr((value) => {
            const arrTemp = [...value]
            arrTemp.shift()
            arrTemp.push(value[1])
            return arrTemp
          })
        }}
        className="right_next"
      />
    </div>
  )
}

export default Slider
