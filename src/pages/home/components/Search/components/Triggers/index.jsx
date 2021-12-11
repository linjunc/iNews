import { useEffect, useState } from 'react'
import { TriggerWrapper } from './style'

const Triggers = ({ length, setCarouselNowIndex }) => {
  const [nowIndex, setNowIndex] = useState(0)
  // 当nowIndex改变时，传递给父元素
  useEffect(() => {
    setCarouselNowIndex(nowIndex)
  }, [nowIndex])

  const renderTrigger = () => {
    const triggers = new Array(length)
    for (let i = 0; i < length; ++i)
      triggers[i] = (
        <li
          key={i}
          className="trigger"
          style={{
            backgroundColor: i === nowIndex && 'rgba(255, 255, 255, 0.9)',
            width: i === nowIndex && '55px',
          }}
          onClick={() => setNowIndex(i)}
        ></li>
      )
    return triggers
  }
  return <TriggerWrapper>{renderTrigger()}</TriggerWrapper>
}

export default Triggers
