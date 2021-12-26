import { Popover, Spin } from 'antd'
import { useEffect, useState } from 'react'
import {
  getGeoPos,
  getWeatherForecast,
  getWeatherNow,
} from '../../../../../../services/home'
import WeatherDetail from './components/WeatherDetail'
// import SelectPos from './components/SelectPos'

const Weather = () => {
  const [adInfo, setAdInfo] = useState()
  const [now, setNow] = useState()
  const [forecast, setForecast] = useState()

  // 地理位置，参数不能改变顺序，因为要计算密钥
  const fetchGeoPos = async () => {
    let location = JSON.parse(localStorage.getItem('location')),
      adInfo = JSON.parse(localStorage.getItem('adInfo'))
    // 如果缺数据就获取一下
    if (!location || !adInfo) {
      ;({ location, ad_info: adInfo } = await getGeoPos({
        callback: 'setGeoPos',
        key: 'IJ2BZ-FJC6G-M44Q5-ILIIR-NVNJ2-IVB6E',
        output: 'jsonp',
        SK: 'Mb3xPG8GHfZkFRNmW9LTqvoG8NSNE5J',
      }))
      localStorage.setItem('location', JSON.stringify(location))
      localStorage.setItem('adInfo', JSON.stringify(adInfo))
    }
    // 设置省份地区
    setAdInfo(adInfo)
    return location
  }
  // 实时天气
  const fetchWeatherNow = async ({ lng, lat }) => {
    let data = JSON.parse(localStorage.getItem('weatherNow'))
    // 实时天气更新时间
    let forecastDate = new Date(data?.updateTime)
    // 当前时间
    let nowDate = new Date()
    // 如果数据为空，或者实时天气过期了（超过1小时），就更新
    if (!data || (nowDate - forecastDate) / 3_600_000 >= 1) {
      ;({ data } = await getWeatherNow({
        key: '306165f7dc124a788750024aed8e97bd',
        location: `${lng},${lat}`,
      }))
      localStorage.setItem('weatherNow', JSON.stringify(data))
    }
    setNow(data.now)
  }
  // 天气预报
  const fetchWeatherForecast = async ({ lng, lat }) => {
    let data = JSON.parse(localStorage.getItem('weatherForecast'))
    // 天气预报更新时间
    let forecastDate = new Date(data?.updateTime)
    // 当前时间
    let nowDate = new Date()
    // 如果数据为空，或者天气预报不是今天的，或者天气预报过期了（超过3小时），就更新
    if (
      !data ||
      forecastDate.getDate() !== nowDate.getDate() ||
      (nowDate - forecastDate) / 3_600_000 >= 3
    ) {
      ;({ data } = await getWeatherForecast({
        key: '306165f7dc124a788750024aed8e97bd',
        location: `${lng},${lat}`,
      }))
      localStorage.setItem('weatherForecast', JSON.stringify(data))
    }
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

  // 如果数据还没加载好，显示加载动画
  if (!now || !forecast)
    return (
      <>
        <Spin size="middle" tip="天气加载中" />
      </>
    )
  return (
    <Popover
      content={
        <div>
          <WeatherDetail {...{ adInfo, now, forecast }} />
          {/* <SelectPos></SelectPos> */}
        </div>
      }
      color="rgba(255, 255, 255, 0.9)"
    >
      <i className={`qi-${now.icon}`} style={{ fontSize: 26 }}></i>
      <span style={{ fontSize: 20 }}>{now.temp}℃</span>
    </Popover>
  )
}

export default Weather
