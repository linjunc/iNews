import React from 'react'
import { useNavigate } from 'react-router'
import { ArticleContainer } from './style'
import { Image } from 'antd'
import { nanoid } from 'nanoid'
const ArticleSide = ({ articleList }) => {
  const navigate = useNavigate()
  // 侧边栏文章详情跳转
  const getSideDetail = (id) => {
    navigate(`/detail/${id}`)
  }
  const hasImg = (data) => {
    //是否有封面及显示
    return data ? (
      <div className="article-list-img">
        <Image
          preview={false}
          src={data}
          onError={(event) => {
            event.target.parentNode.parentNode.style.display = 'none'
          }}
        />
      </div>
    ) : null
  }
  return (
    <ArticleContainer>
      {articleList?.map((article) => (
        <div
          key={nanoid()}
          className="author-article"
          onClick={() => getSideDetail(article?.article_id)}
        >
          {hasImg(article?.image_url)}
          <div className="article-list-right">
            <div className="article-list-title">{article?.title}</div>
            <div className="article-list-num">
              <div className="article-read">{article?.read_count} 阅读</div>
              <div className="article-time">{article?.publish_time}</div>
            </div>
          </div>
        </div>
      ))}
    </ArticleContainer>
  )
}

export default ArticleSide
