// 文章项组件
import React, { useEffect } from 'react'
import { Artilecontainer } from './style'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Image } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import notFound from '../../../../assets/home/404.svg'

import { useNavigate } from 'react-router-dom'

// dayjs 配置
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)

const Article = ({ data }) => {
  const navigate = useNavigate()

  const toDetail = () => {
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }

  const hasImg = () => {
    //是否有封面及显示
    return data.image_url ? (
      <div className="right">
        <Image
          preview={false}
          onClick={toDetail}
          className="article-img"
          src={data.image_url}
          fallback={notFound}
        />
      </div>
    ) : null
  }
  useEffect(() => {}, [])
  return (
    <Artilecontainer>
      <div className="article-node">
        <div className="left">
          <div className="article-top">
            <h2 onClick={toDetail} className="article-title">
              {data.title}
            </h2>
          </div>
          <div className="article-center">
            <p className="article-abstract">{data.abstract}</p>
          </div>
          <div className="article-bottom">
            <span className="media_name">{data.media_user.media_name}</span>
            <span onClick={toDetail} className="comment_count">
              {data.comment_count} 评论
            </span>
            <span className="publish_time">
              {
                // 计算到当前时间的距离
                dayjs(parseInt(data.publish_time + '000')).fromNow()
              }
            </span>
          </div>
        </div>
        {hasImg()}
      </div>
    </Artilecontainer>
  )
}

export default Article
