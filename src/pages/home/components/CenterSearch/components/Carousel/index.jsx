import { CarouselWrapper } from './style'

const Carousel = ({ dataArray, nowIndex }) => {
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
          }}
        >
          <img src={data} alt="test" className="img-layer" />
        </div>
      ))}
    </CarouselWrapper>
  )
}

export default Carousel
