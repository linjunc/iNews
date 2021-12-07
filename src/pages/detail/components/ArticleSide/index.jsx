import React from 'react';
import { useNavigate } from 'react-router';
import { ArticleContainer } from './style'
import { nanoid } from 'nanoid';
const ArticleSide = ({ articleList }) => {
    const navigate = useNavigate()
    // 侧边栏文章详情跳转
    const getSideDetail = (id) => {
        navigate(`/detail/${id}`)
    } 

    return (
        <ArticleContainer> 
            {
                articleList?.map(article =>
                    <div key={nanoid()} className="author-article" onClick={() => getSideDetail(article?.article_id)} >
                        <div className="article-list-img">
                            <img src={article?.image_url} alt="" />
                        </div>
                        <div className="article-list-right">
                            <div className="article-list-title">{article?.title}</div>
                            <div className="article-list-num">
                                <div className="article-read">{article?.like_count} 阅读</div>
                                <div className="article-time">{article?.publish_time}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </ArticleContainer>
    );
};

export default ArticleSide;