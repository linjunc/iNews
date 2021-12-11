import instance from '../utils/request'
import md5 from 'md5'

export const getArticles = (options) => {
  return instance({
    url: '/article_list',
    method: 'GET',
    params: options,
  })
}

// 腾讯位置服务接口，需要使用callback计算数字签名，所以没有使用jsonp库
// 参考：https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
export const getGeoPos = ({ SK, ...options }) => {
  const url = '/ws/location/v1/ip'
  const params = new URLSearchParams(options)
  // 计算数字签名
  params.append('sig', md5(`${url}?${params.toString()}${SK}`))

  return new Promise((resolve, reject) => {
    // jsonp
    const script = document.createElement('script')
    script.src = `https://apis.map.qq.com${url}?${params.toString()}`
    document.body.append(script)
    document.body.removeChild(script)
    // 全局回调函数
    window[options.callback] = (res) => {
      if (res && res.status === 0) resolve(res.result.location)
      else reject('getGeoPos请求失败')
    }
  })
}

// 和风天气接口，根据经纬度获取天气
// 参考：https://dev.qweather.com/docs/api/weather/weather-now/
export const getWeather = (options) => {
  return instance({
    url: 'https://devapi.qweather.com/v7/weather/now',
    method: 'GET',
    params: options,
  })
}
