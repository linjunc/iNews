import { SearchContainer } from './style'
import Parallax from './components/Parallax'
import Carousel from './components/Carousel'
import Triggers from './components/Triggers'
import PageHeader from './components/PageHeader'
import LogoWhiteText from '../../../../assets/logo/logo_white_text.png'
import { useEffect, useState } from 'react'
import Search from '../../../../components/Search'

const CenterSearch = () => {
  // 轮播图数据
  const dataArray = [
    'https://ljcimg.oss-cn-beijing.aliyuncs.com/photo/windows-11-windows-theme-7-hd.jpg',
    'https://ljcimg.oss-cn-beijing.aliyuncs.com/photo/windows-11-bloom-q2-1920x1200.jpg',
    'https://ljcimg.oss-cn-beijing.aliyuncs.com/photo/wallpaper2you_57812.jpg',
    'https://ljcimg.oss-cn-beijing.aliyuncs.com/photo/Tumblr-1080p-HD-Wallpapers-1_thumb.jpg',
    'https://ljcimg.oss-cn-beijing.aliyuncs.com/photo/Ci1x9D.jpg',
    'https://ljcimg.oss-cn-beijing.aliyuncs.com/photo/1081747-widescreen-shipwreck-wallpaper-2048x1152-for-iphone-5s.jpg'
  ]
  // 轮播图索引
  const [carouselNowIndex, setCarouselNowIndex] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarouselNowIndex((carouselNowIndex + 1) % dataArray.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [carouselNowIndex, dataArray.length])

  return (
    <SearchContainer>
      {/* 视差滚动 */}
      <Parallax>
        <Carousel dataArray={dataArray} nowIndex={carouselNowIndex}></Carousel>
      </Parallax>
      {/* 内容 */}
      <div className="absolute-wrapper">
        <PageHeader></PageHeader>
        <div className="search-wrapper">
          <div className="logo-box">
            <img className="logo" src={LogoWhiteText} alt="iNews" />
          </div>
          <Search></Search>
        </div>
        <Triggers
          length={dataArray.length}
          carouselNowIndex={carouselNowIndex}
          setCarouselNowIndex={setCarouselNowIndex}
        ></Triggers>
      </div>
    </SearchContainer>
  )
}

export default CenterSearch
