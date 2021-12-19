import { SearchContainer } from './style'
import Parallax from './components/Parallax'
import Carousel from './components/Carousel'
import Triggers from './components/Triggers'
import PageHeader from './components/PageHeader'
import LogoWhiteText from '../../../../assets/logo/logo_white_text.png'
import { useState } from 'react'
import Search from '../../../../components/Search'

const CenterSearch = () => {
  // 轮播图数据
  const dataArray = [
    'https://www.bing.com/th?id=OHR.GlowWormBMNP_ROW6135196064_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.Koenigsbourg_EN-CN0469158461_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.ElPanecilloHill_ROW0950584812_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://cn.bing.com/th?id=OHR.SalzburgKrampus_EN-CN4908289673_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.PFNPAZ_EN-CN5967095773_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.FoxDovrefjell_EN-CN7339664323_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
  ]
  // 轮播图索引
  const [carouselNowIndex, setCarouselNowIndex] = useState(0)

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
