//热点
import { Carousel } from 'antd'
import React, { useRef } from 'react'
import HotRecommend from './HotRecommend'
import Slider from './Slider'
import { HotArticlecontainer } from './style'
import { useNavigate } from 'react-router-dom'
const HotArticle = () => {
  // 轮播图数据
  const dataArray = [
    {
      article_id: '61aaf83957145eb325629666',
      publish_time: '1634717676',
      image_url:
        'https://p3.toutiaoimg.com/list/pgc-image/ebda9d34d908475ba723000abf23fc7c',
      media_id: '61ad958ef1bfdb0262ab9224',
      media_user: {
        media_name: '猫眼观史',
        avatar_url: 'https://p9.toutiaoimg.com/thumb/ff5100001dac734ba989',
        follower_count: '547795',
        media_info: '这是猫眼的信息，这是信息',
      },
      like_count: 501,
      title: '1995年，7人抢劫农行1500万，广东出动3500名干警抓捕，结局如何',
      abstract:
        '云南瑞丽建材市场，熙熙攘攘热闹非凡，谁都希望自己有个好邻居，偶尔碰到急事儿，相互之间有个照应。市场里有个商铺老板，长得是文质彬彬，得了个外号叫“眼镜”，他极力伪装自己的善良人设，努力经营家庭和事业，从不跟周围的任何人吵架。',
      tag: 'news_society',
      digg_count: 9603,
      comment_count: 258,
      has_image: true,
      group_id: '7017607743439651336',
      image_list: [
        'https://p3.toutiaoimg.com/list/pgc-image/ebda9d34d908475ba723000abf23fc7c',
        'https://p3.toutiaoimg.com/list/pgc-image/ebda9d34d908475ba723000abf23fc7c',
        'https://p3.toutiaoimg.com/list/pgc-image/ebda9d34d908475ba723000abf23fc7c',
      ],
    },
    {
      article_id: '61aafa1ae808964d5607449c',
      publish_time: 1636669391,
      image_url:
        'http://p9.toutiaoimg.com/img/pgc-image/d28a4967c74e466194530b5c7a1e87b4~tplv-tt-cs0:640:360.jpg',
      media_id: '61adf180f1bfdb0262ab9306',
      media_user: {
        media_name: '用图说史',
        avatar_url:
          'http://p9.toutiaoimg.com/origin/user-avatar/ad8fd633166b7be4c25307689465b8b6',
        follower_count: '7973',
        media_info: '这是用图说史的信息，这是信息',
      },
      like_count: 454,
      title: '宁波1978年的17张照片',
      abstract:
        '1978年，镇海发电厂一号机并网发电情景。1978年，南京市商业局印发的《烟票》。1978年，宁波市聋哑学校毕业生留念。',
      tag: 'news_society',
      digg_count: 222,
      comment_count: 89,
      has_image: true,
      group_id: '7028736336752296488',
      image_list: [],
    },
    {
      article_id: '61aafaf72cdf2f4c5a650f47',
      publish_time: 1631918533,
      image_url:
        'http://p3.toutiaoimg.com/img/pgc-image/8d65d5f2b83b4ccaa3de2ae7c12df129~tplv-tt-cs0:640:360.jpg',
      media_id: '61adf1b6f1bfdb0262ab930f',
      media_user: {
        media_name: '愚樵耕笃',
        avatar_url:
          'http://p26.toutiaoimg.com/origin/user-avatar/150c9fe5730be0c329d9c3cc56dcc44b',
        follower_count: '12764',
        media_info: '没想到吧，我又回来了',
      },
      like_count: 322,
      title: '成都1999年的14张照片',
      abstract:
        '1999年，成都，北门公交站。1999年，《成都商报》的发行、广告跃居西部报媒第一，成为主流强势媒体。',
      tag: 'news_society',
      digg_count: 2589,
      comment_count: 222,
      has_image: true,
      group_id: '7008788334466089506',
      image_list: [],
    },
    {
      article_id: '61aafb9cd388c9c9b64e284f',
      publish_time: 1638532172,
      image_url:
        'https://p3.toutiaoimg.com/list/tos-cn-i-tjoges91tu/SqGFLspBdMcIIk',
      media_id: '61adf1e91dfc2302433781fc',
      media_user: {
        media_name: '中国医疗保险杂志',
        avatar_url: 'https://p5.toutiaoimg.com/thumb/150c0009964e004fbeed',
        follower_count: '872066',
        media_info: '懂得都懂，不懂的也不必多说',
      },
      like_count: 454,
      title: '又到居民医保缴费时，今年的医保我们要交吗？',
      abstract:
        '医保领域领先的新媒体平台。发现医保家园小区业主群里十分热闹。原来大家最近都在关注居民医保缴费。中国医疗保险官方微信 ID:zgylbxzzs。',
      tag: 'news_society',
      digg_count: 366,
      comment_count: 114,
      has_image: true,
      group_id: '7037442092582306340',
      image_list: [],
    },
    {
      article_id: '61aafc2152b433de5a03bc22',
      publish_time: 1636919512,
      image_url:
        'https://p3.toutiaoimg.com/list/pgc-image/9c5dcf713bc04713b32383919b3c3c9b',
      media_id: '61adf180f1bfdb0262ab9306',
      media_user: {
        media_name: '用图说史',
        avatar_url:
          'http://p9.toutiaoimg.com/origin/user-avatar/ad8fd633166b7be4c25307689465b8b6',
        follower_count: '7973',
        media_info: '这是用图说史的信息，这是信息',
      },
      like_count: 64,
      title: '杭州1990年的21张照片',
      abstract:
        '1990年4月，杭州万人空巷喜迎亚运火炬。1990年，春游西湖的杭州儿童。1990年秋，游览杭州菊花展时留影。',
      tag: 'news_society',
      digg_count: 771,
      comment_count: 197,
      has_image: true,
      group_id: '7029568684570001935',
      image_list: [],
    },
  ]
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
            <Slider dataArray={dataArray} next={next} prev={prev} />
          </div>
          <div className="home_right hot_right">
            <HotRecommend />
          </div>
        </div>
      </div>
    </HotArticlecontainer>
  )
}

export default HotArticle
