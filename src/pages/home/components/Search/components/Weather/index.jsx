import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { getGeoPos, getWeather } from '../../../../../../services/home'

const Weather = () => {
  const [weather, setWeather] = useState({
    code: '200',
    updateTime: '2021-12-11T20:27+08:00',
    fxLink: 'http://hfx.link/1u0l1',
    now: {
      obsTime: '2021-12-11T20:10+08:00',
      temp: '19',
      feelsLike: '20',
      icon: '150',
      text: '晴',
      wind360: '45',
      windDir: '东北风',
      windScale: '1',
      windSpeed: '4',
      humidity: '84',
      precip: '0.0',
      pressure: '1013',
      vis: '10',
      cloud: '2',
      dew: '15',
    },
    refer: {
      sources: ['QWeather', 'NMC', 'ECMWF'],
      license: ['no commercial use'],
    },
  })

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        // 不能改变顺序
        const { lng, lat } = await getGeoPos({
          callback: 'setGeoPos',
          key: 'IJ2BZ-FJC6G-M44Q5-ILIIR-NVNJ2-IVB6E',
          output: 'jsonp',
          SK: 'Mb3xPG8GHfZkFRNmW9LTqvoG8NSNE5J',
        });
        // 先经度再纬度
        const weatherData = await getWeather({ 
          key: '306165f7dc124a788750024aed8e97bd',
          location: `${lng},${lat}`
         });
        setWeather(weatherData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []) */

  return <div>天气</div>
}

export default Weather
