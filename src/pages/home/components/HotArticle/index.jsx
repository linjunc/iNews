//热点
import { Carousel } from 'antd'
import React, { useRef } from 'react'
import HotRecommend from './HotRecommend'
import Slider from './Slider'
import { HotArticlecontainer } from './style'
import { useNavigate } from 'react-router-dom'
import { shuffle } from '../../../../utils/shuffle'
const HotArticle = ({ hotArr }) => {
  // 轮播图数据
  const dataArray = hotArr.slice(0, 5)
  const navigate = useNavigate()
  const toDetail = (data) => {
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }

  const hot_carousel = useRef(null)
  const next = () => {
    hot_carousel.current.next()
  }
  const prev = () => {
    hot_carousel.current.prev()
  }
  const showSlider = () => {
    if (hotArr.length)
      return <Slider dataArray={dataArray} next={next} prev={prev} />
  }

  return (
    <HotArticlecontainer>
      <div className="hot_article">
        <div className="content">
          <div className="main">
            <Carousel ref={hot_carousel} dots={false} effect="fade">
              {dataArray.map((data) => (
                <div
                  onClick={() => {
                    toDetail(data)
                  }}
                  className="Carousel_node"
                  key={data}
                >
                  <img className="hot_img" src={data.image_url} alt="" />
                  <div className="vague"></div>
                  <div className="detail">
                    <h2 className="title">{data.title}</h2>
                    <p className="abstract">{data.abstract}</p>
                  </div>
                </div>
              ))}
            </Carousel>
            {showSlider()}
          </div>
          <div className="home_right hot_right">
            <HotRecommend hotList={shuffle(hotArr.slice(5, 11))} />
          </div>
        </div>
      </div>
    </HotArticlecontainer>
  )
}

export default HotArticle
