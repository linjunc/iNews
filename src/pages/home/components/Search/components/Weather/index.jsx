import { inRange } from 'lodash'
import { EnvironmentOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  getGeoPos,
  getWeatherForecast,
  getWeatherNow,
} from '../../../../../../services/home'
import { WeatherWrapper } from './style'
import { Spin } from 'antd'

const Weather = () => {
  const [adInfo, setAdInfo] = useState()
  const [now, setNow] = useState()
  const [forecast, setForecast] = useState()

  // 地理位置，参数不能改变顺序，因为要计算密钥
  const fetchGeoPos = async () => {
    const { location, ad_info } = await getGeoPos({
      callback: 'setGeoPos',
      key: 'IJ2BZ-FJC6G-M44Q5-ILIIR-NVNJ2-IVB6E',
      output: 'jsonp',
      SK: 'Mb3xPG8GHfZkFRNmW9LTqvoG8NSNE5J',
    })
    // 设置省份地区
    setAdInfo(ad_info)
    return location
  }
  // 实时天气，先经度再纬度
  const fetchWeatherNow = async ({ lng, lat }) => {
    const { data } = await getWeatherNow({
      key: '306165f7dc124a788750024aed8e97bd',
      location: `${lng},${lat}`,
    })
    setNow(data.now)
  }
  // 天气预报，先经度再纬度
  const fetchWeatherForecast = async ({ lng, lat }) => {
    const { data } = await getWeatherForecast({
      key: '306165f7dc124a788750024aed8e97bd',
      location: `${lng},${lat}`,
    })
    setForecast(data)
  }
  // 初始化天气数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await fetchGeoPos()
        fetchWeatherNow(location)
        fetchWeatherForecast(location)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

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
  // 如果数据还没加载好，显示加载动画
  if (!now || !forecast) return <Spin size="large"></Spin>
  return (
    <WeatherWrapper>
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
    </WeatherWrapper>
  )
}

export default Weather
