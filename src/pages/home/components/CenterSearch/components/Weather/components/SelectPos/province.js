import md5 from 'md5'

export const getProvinces = () => {
  const options = {
    callback: 'setGeoPos',
    key: 'IJ2BZ-FJC6G-M44Q5-ILIIR-NVNJ2-IVB6E',
    output: 'jsonp',
    SK: 'Mb3xPG8GHfZkFRNmW9LTqvoG8NSNE5J',
  }
  const url = '/ws/location/v1/ip'
  const params = new URLSearchParams(options)
  // 计算数字签名
  params.append('sig', md5(`${url}?${params.toString()}${options.SK}`))

  return new Promise((resolve, reject) => {
    // jsonp
    const script = document.createElement('script')
    script.src = `https://apis.map.qq.com${url}?${params.toString()}`
    document.body.append(script)
    document.body.removeChild(script)
    // 全局回调函数
    window[options.callback] = (res) => {
      if (res && res.status === 0) resolve(res.result)
      else reject('getGeoPos请求失败')
    }
  })
}
