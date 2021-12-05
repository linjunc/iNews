// 文章详情
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import { Skeleton, Button } from 'antd'
import { throttle } from 'lodash';
import { getArticleDetail, getArticleList } from '../../services/detail'

import LoveButton from '../../components/LoveButton'
import logo from '../../assets/logo/logo.png'
import {
    DetailWrapper,

} from './style'

// dayjs 配置
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)

// 采用 memo 对子组件重新渲染造成的影响进行控制

const Detail = memo(() => {
    // 状态定义
    const { id } = useParams() || { id: "7037433142361195039" }
    const navigate = useNavigate()
    const [artLoading, setArtLoading] = useState(false) // 骨架屏显示
    const [loveDone, setLoveDone] = useState(false)    // 按钮点击状态
    const [collect, setCollect] = useState(false)      // 收藏状态 
    const [article, setArticle] = useState({})         // 文章数据
    const [articleList, setArticleList] = useState([]) // 文章列表数据
    const [show, setShow] = useState(false)              // 侧边栏固定状态
    const [numGroup, setNumGroup] = useState({
        loveNum: 0,
        commentNum: 0,
        collectNum: 0
    })

    // 初始化文章数据
    useEffect(() => {
        const getArticle = async () => {
            setArtLoading(true)
            const res = await getArticleDetail({ item_id: id })
            const { article } = res.data
            // 存储文章点赞数据
            setNumGroup({
                loveNum: article.digg_count,
                commentNum: article.comment_count,
                collectNum: article.like_count
            })
            // 处理时间
            article.publish_time = dayjs.unix(article.publish_time).format('YYYY-MM-DD HH:mm')
            setArticle(article)
            const userArticle = await getArticleList({ tag: "news_society", n: "5", skip: "0" })
            const articleList = userArticle.data.article_list
            // 计算到当前时间的距离
            articleList.forEach(article => {
                article.publish_time = dayjs(parseInt(article.publish_time + '000')).fromNow()
            })

            setArticleList(articleList)
            setArtLoading(false)
        }
        getArticle()
    }, [id])

    // 处理点击事件
    const handleLove = () => {
        setNumGroup({ ...numGroup, loveNum: loveDone ? --numGroup.loveNum : ++numGroup.loveNum })
        setLoveDone(!loveDone)
    }
    // 处理收藏事件
    const handleCollect = () => {
        setNumGroup({ ...numGroup, collectNum: collect ? --numGroup.collectNum : ++numGroup.collectNum })
        setCollect(!collect)
    }

    const getSideDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    // 处理侧边栏定位
    // 判断滚动方向
    let scrollTop = 0

    // 获取距离顶部的距离
    const getScrollTop = () => {
        let scrollTop = 0;
        if (document?.documentElement && document?.documentElement?.scrollTop) {
            scrollTop = document?.documentElement.scrollTop;
        }
        else if (document?.body) {
            scrollTop = document?.body.scrollTop;
        }
        return scrollTop;
    }
    // 获取距离顶部的距离
    const bindHandleScroll = throttle(() => {
        scrollTop = getScrollTop();
        // 大于一定距离后显示固定
        if (scrollTop >= 1000) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, 100)
    // 初始化滚动事件
    useEffect(() => {
        window.addEventListener('scroll', bindHandleScroll)
        return () => {
            window.removeEventListener('scroll', bindHandleScroll)
        }
    }, [])
    return (
        <DetailWrapper>
            {/* 骨架屏加载 */}
            <Skeleton active loading={artLoading} paragraph={{ rows: 16 }} round >
                {/* 左侧交互按钮 */}
                <div className="left-sidebar">
                    <div className='left-box'>
                        <div className='left-clear'></div>
                        <div className='left-container'>
                            <LoveButton handleClick={handleLove} done={loveDone} key="love" type={0} number={numGroup.loveNum} />
                            <LoveButton handleClick={handleLove} key="comment" type={1} number={numGroup.commentNum} />
                            <LoveButton handleClick={handleCollect} done={collect} key="collect" type={2} number={numGroup.collectNum} />
                        </div>
                    </div>
                </div>
                {/* 文章内容 */}
                <div className="main">
                    <div className="article-container">
                        <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
                        <div className="article-meta">
                            <div className="article-type">原创</div>
                            <div className="article-time">{article.publish_time}</div>
                            <div className="article-author">{article?.media_user?.media_name} </div>
                        </div>
                        <article dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                </div>
                {/* 右侧侧边栏 */}
                <div className="right-sidebar">
                    {/* 作者信息 */}
                    <div className="author-info">
                        <div className="author-head">
                            <img src={article?.media_user?.avatar_url} alt="" />
                        </div>
                        <div className="author-name">{article?.media_user?.media_name}</div>
                        <div className="author-des">{article?.media_user?.media_info}</div>
                        <Button type="primary" className='author-love'>+ 关注</Button>
                    </div>
                    {/* 虚线 */}
                    <div className="hot-line">
                        <span>作者热门文章</span>
                    </div>

                    {/* 作者热门文章 */}
                    <div className="author-box">
                        {
                            articleList.map(article =>
                                <div key={article?.item_id} className="author-article" onClick={() => getSideDetail(article?.item_id)} >
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
                    </div>
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
                    {/* 下滑过长后的固定右侧 */}
                    <div className={show ? "sticky-box show" : "sticky-box"}>
                        {/* 作者信息 */}
                        <div className="author-info">
                            <div className="author-head">
                                <img src={article?.media_user?.avatar_url} alt="" />
                            </div>
                            <div className="author-name">{article?.media_user?.media_name}</div>
                            <div className="author-des">{article?.media_user?.media_info}</div>
                            <Button type="primary" className='author-love'>+ 关注</Button>
                        </div>
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
                    </div>
                    {/* 热榜 */}
                    <div className="hot-list"></div>
                </div>
            </Skeleton>
        </DetailWrapper>
    );
})

export default Detail;