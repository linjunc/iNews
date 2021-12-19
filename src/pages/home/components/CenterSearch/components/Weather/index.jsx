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
