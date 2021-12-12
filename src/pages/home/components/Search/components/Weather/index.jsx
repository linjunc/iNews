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
  const [adInfo, setAdInfo] =
    useState(/* {"nation": "中国","province": "广东省","city": "广州市","district": "","adcode": 440100} */)
  const [now, setNow] =
    useState(/* {"obsTime":"2021-12-12T14:10+08:00","temp":"25","feelsLike":"23","icon":"100","text":"晴","wind360":"0","windDir":"北风","windScale":"3","windSpeed":"18","humidity":"46","precip":"0.0","pressure":"1018","vis":"17","cloud":"2","dew":"8"} */)
  const [forecast, setForecast] =
    useState(/* { "code": "200", "updateTime": "2021-12-11T22:35+08:00", "fxLink": "http://hfx.link/1u0l1", "daily": [{ "fxDate": "2021-12-11", "sunrise": "06:57", "sunset": "17:42", "moonrise": "12:56", "moonset": "00:53", "moonPhase": "上弦月", "moonPhaseIcon": "802", "tempMax": "25", "tempMin": "11", "iconDay": "101", "textDay": "多云", "iconNight": "150", "textNight": "晴", "wind360Day": "358", "windDirDay": "北风", "windScaleDay": "1-2", "windSpeedDay": "7", "wind360Night": "0", "windDirNight": "北风", "windScaleNight": "3-4", "windSpeedNight": "16", "humidity": "56", "precip": "0.0", "pressure": "1019", "vis": "25", "cloud": "16", "uvIndex": "4" }, { "fxDate": "2021-12-12", "sunrise": "06:58", "sunset": "17:43", "moonrise": "13:29", "moonset": "01:45", "moonPhase": "盈凸月", "moonPhaseIcon": "803", "tempMax": "25", "tempMin": "11", "iconDay": "100", "textDay": "晴", "iconNight": "151", "textNight": "多云", "wind360Day": "0", "windDirDay": "北风", "windScaleDay": "3-4", "windSpeedDay": "24", "wind360Night": "0", "windDirNight": "北风", "windScaleNight": "3-4", "windSpeedNight": "24", "humidity": "61", "precip": "0.0", "pressure": "1022", "vis": "25", "cloud": "3", "uvIndex": "4" }, { "fxDate": "2021-12-13", "sunrise": "06:59", "sunset": "17:43", "moonrise": "14:01", "moonset": "02:36", "moonPhase": "盈凸月", "moonPhaseIcon": "803", "tempMax": "23", "tempMin": "11", "iconDay": "101", "textDay": "多云", "iconNight": "150", "textNight": "晴", "wind360Day": "0", "windDirDay": "北风", "windScaleDay": "3-4", "windSpeedDay": "16", "wind360Night": "45", "windDirNight": "东北风", "windScaleNight": "3-4", "windSpeedNight": "16", "humidity": "59", "precip": "0.0", "pressure": "1018", "vis": "25", "cloud": "4", "uvIndex": "4" }], "refer": { "sources": ["QWeather", "NMC", "ECMWF"], "license": ["no commercial use"] } } */)

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
      <a href={forecast?.fxLink || 'https://www.qweather.com/'} target="_blank">
        详情
      </a>
    </WeatherWrapper>
  )
}

export default Weather
