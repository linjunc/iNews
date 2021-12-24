import { Image } from 'antd'
import { HotRecommendWrapper } from './style'
import logo from '../../../../../assets/logo/logo.png'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import CenterLine from '../../../../detail/components/CenterLine'
// dayjs 配置
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)
const HotRecommend = ({ hotList }) => {
  const navigate = useNavigate()
  const toDetail = (data) => {
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }
  const hasImg = (article) => {
    if (article.image_url)
      return (
        <div className="article-list-img">
          <Image
            preview={false}
            src={article.image_url}
            onError={(event) => {
              event.target.parentNode.parentNode.style.display = 'none'
            }}
          />
        </div>
      )
  }
  return (
    <HotRecommendWrapper>
      <div className="hot_recommend">
        {/* 广告 */}
        <div className="hot-advertise">
          <div className="our-logo">
            <img src={logo} alt="" />
          </div>
          <div className="our-text">
            <div className="our-title">iNews 新闻门户网站</div>
            <div className="our-slogan">更轻、更快、更有趣</div>
            <div className="our-info">欢迎加入我们</div>
          </div>
        </div>
        <CenterLine title="热门推荐" />
        {hotList?.map((article) => (
          <div
            key={article.article_id}
            className="author-article"
            onClick={() => toDetail(article)}
          >
            {hasImg(article)}
            <div className="article-list-right">
              <div className="article-list-title">{article?.title}</div>
              <div className="article-list-num">
                <div className="article-read">{article?.read_count} 阅读</div>
                <div className="article-time">
                  {dayjs(parseInt(article.publish_time + '000')).fromNow()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </HotRecommendWrapper>
  )
}

export default HotRecommend
