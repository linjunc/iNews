import { SearchContainer } from './style'
import Parallax from './components/Parallax'
import Carousel from './components/Carousel'
import Triggers from './components/Triggers'
import PageHeader from './components/PageHeader'
// import Logo from "../../../../assets/logo/logo.png"
import LogoWhiteText from '../../../../assets/logo/logo_white_text.png'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

const Search = () => {
  // 轮播图数据
  const dataArray = [
    'https://cn.bing.com/th?id=OHR.SalzburgKrampus_EN-CN4908289673_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.PFNPAZ_EN-CN5967095773_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.FoxDovrefjell_EN-CN7339664323_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
    'https://www.bing.com/th?id=OHR.Koenigsbourg_EN-CN0469158461_1920x1080.jpg&rf=LaDigue_1920x1080.jpg',
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
          <img className="logo" src={LogoWhiteText} alt="iNews" />
          {/* <div className="logo"></div> */}
          <div className="search-box">
            <input type="text" className="input" autoFocus />
            <div className="button">
              <SearchOutlined className="icon" />
            </div>
          </div>
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

export default Search
