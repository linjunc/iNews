import React, { useEffect } from 'react'
import { Artilecontainer } from './style'

import { useNavigate } from 'react-router-dom'

const Article = ({ data }) => {
  const navigate = useNavigate()

  const toDetail = () => {
    console.log(data)
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }

  const hasImg = () => {
    //有无封面
    // console.log(data.image_url)
    return data.image_url ? (
      <div className="right">
        <img
          onClick={toDetail}
          className="article-img"
          src={data.image_url}
          alt=""
        />
      </div>
    ) : null
  }
  useEffect(() => {
    // console.log(data)
  }, [])
  return (
    <Artilecontainer>
      <div className="article-node">
        <div className="left">
          <div className="article-top">
            <h2 onClick={toDetail} className="article-title">
              {data.title}
            </h2>
          </div>
          <div className="article-bottom">
            <span className="media_name">{data.media_user.media_name}</span>
            <span onClick={toDetail} className="comment_count">
              {data.comment_count}评论
            </span>
            <span className="publish_time">{data.publish_time}</span>
          </div>
        </div>
        {hasImg()}
      </div>
    </Artilecontainer>
  )
}

export default Article
