import { TriggerWrapper } from './style'

const Triggers = ({
  length,
  carouselNowIndex: nowIndex,
  setCarouselNowIndex: setIndex,
}) => {
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
          onClick={() => setIndex(i)}
        ></li>
      )
    return triggers
  }
  return <TriggerWrapper>{renderTrigger()}</TriggerWrapper>
}

export default Triggers
