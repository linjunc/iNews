import { useState } from 'react'
import { CarouselWrapper } from './style'

const Carousel = () => {
  const dataArray = [
    'https://www.bing.com/th?id=OHR.FoxDovrefjell_EN-CN7339664323_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.GlowWormBMNP_EN-CN7189621327_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.PFNPAZ_EN-CN5967095773_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
  ]
  const [nowIndex, setNowIndex] = useState(0)

  return (
    <CarouselWrapper>
      {dataArray.map((data, index) => (
        <div
          key={index}
          className="img-wrapper"
          style={{
            transform: `translateX(${
              index !== nowIndex ? (index < nowIndex ? -100 : 100) : 0
            }%)`,
            cursor: 'default',
          }}
        >
          <img src={data} alt="test" className="img-layer" />
        </div>
      ))}
      <ul className="trigger-wrapper">
        {dataArray.map((data, index) => (
          <li
            key={index}
            className="trigger"
            style={{
              backgroundColor: index === nowIndex && 'rgba(255, 255, 255, 0.9)',
              width: index === nowIndex && '55px',
            }}
            onClick={() => setNowIndex(index)}
          ></li>
        ))}
      </ul>
    </CarouselWrapper>
  )
}

export default Carousel
