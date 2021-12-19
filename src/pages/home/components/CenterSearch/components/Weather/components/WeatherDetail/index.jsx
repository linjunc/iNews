import { EnvironmentOutlined } from '@ant-design/icons'
import { Detail } from './style'
import { inRange } from 'lodash'

const WeatherDetail = ({ adInfo, now, forecast }) => {
  /**
   * 判断当前是白天还是晚上，早上7点后到晚上6点前，认为是白天
   * @returns {boolean} 白天true，晚上false
   */
  const dayOrNight = () => {
    return inRange(new Date().getHours(), 7, 18)
  }
  // 更换地区
  const changeLocation = () => {
    console.log('try to change location')
  }

  return (
    <Detail>
      <header className="header">
        <div className="temp">{now.temp}</div>
        <div className="text">{now.text}</div>
        <div className="icon">
          <i className={`qi-${now.icon}`}></i>
        </div>
      </header>
      {forecast.daily.map((data, index) => (
        <div key={index} className="forecast">
          {/* 日期，去掉年份 */}
          <div className="date">{data.fxDate.substring(5)}</div>
          {/* 图标 */}
          <div className="icon">
            <i
              className={`qi-${dayOrNight() ? data.iconDay : data.iconNight}`}
            ></i>
          </div>
          {/* 最高温度和最低温度 */}
          <div>
            {data.tempMax}℃/{data.tempMin}℃
          </div>
        </div>
      ))}
      <div className="city" onClick={changeLocation}>
        {adInfo.province}
        {adInfo.city}
        <EnvironmentOutlined />
      </div>
      <a
        href={forecast?.fxLink || 'https://www.qweather.com/'}
        rel="noreferrer"
        target="_blank"
      >
        详情
      </a>
    </Detail>
  )
}

export default WeatherDetail
