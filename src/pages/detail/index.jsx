// 文章详情
import React, { memo, useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import { Skeleton, Button, Slider, message } from 'antd'
import { throttle } from 'lodash';
import { PhotoProvider, PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';


import { getArticleByTag, getArticleDetail, getArticleList } from '../../services/detail'
import { speak } from '../../utils/speak';
import { getScrollTop } from '../../utils/scrollHeight';
import BackToTop from './components/BackToTop';
import QrCode from './components/QrCode';
import ArticleSide from './components/ArticleSide'
import CenterLine from './components/CenterLine'
import LoveButton from '../../components/LoveButton'
import logo from '../../assets/logo/logo.png'
import {
    DetailWrapper,
} from './style'

// dayjs 配置
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)

// 采用 memo 对子组件重新渲染造成的影响进行控制


// 测试数据
const imgData = [
    "https://p3.toutiaoimg.com/list/tos-cn-i-qvj2lq49k0/a8db2b900fe44d84ad8a110dbe65ed1f",
    "https://p3.toutiaoimg.com/list/tos-cn-i-qvj2lq49k0/6703e6dd00f0433185d1d2b6ea76bbc6",
    "https://p3.toutiaoimg.com/list/tos-cn-i-qvj2lq49k0/b2b9f02855794552b979a5793704a3b9",
    "https://p3.toutiaoimg.com/large/pgc-image/afecbcb501794693bc57d3d42fa06fdc"
]

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
    const [isImmerse, setIsImmerse] = useState(false) // 沉浸模式
    const [size, setSize] = useState(16) // 文章字体大小
    const [isSpeak, setIsSpeak] = useState(false) // 语音播报的状态
    const [visible, setVisible] = useState(false) // 预览开启
    const [photoIndex, setPhotoIndex] = useState(0); //当前预览的第几张
    const [numGroup, setNumGroup] = useState({
        loveNum: 0,
        commentNum: 0,
        collectNum: 0
    })

    // 初始化文章数据
    useEffect(() => {
        let startTime = 0
        let tag = ''
        const getArticle = async () => {
            setArtLoading(true)
            try {
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
                // 获取用户热门文章
                const userArticle = await getArticleList({ user_id: article.media_id, n: "5", skip: "0" })
                // 获取标签相关的文章
                const tagArticle = await getArticleByTag({ tag: article.tag, n: "5", skip: "0" })
                // 热门文章数据
                const articleList = userArticle.data.article_list
                // 标签文章数据
                const tagArticleList = tagArticle.data.article_list
                // 计算到当前时间的距离
                articleList.forEach(article => {
                    article.publish_time = dayjs(parseInt(article.publish_time + '000')).fromNow()
                })
                // 计算到当前时间的距离
                tagArticleList.forEach(article => {
                    article.publish_time = dayjs(parseInt(article.publish_time + '000')).fromNow()
                })
                // 添加文章列表数据
                setArticleList([articleList, tagArticleList])
                // 成功获取文章后，打开计时器
                startTime = dayjs().valueOf()
                tag = article.tag
            } catch (error) {
                // 获取失败直接返回首页
                message.error('加载失败，请重试')
                navigate('/')
            } finally {
                setArtLoading(false)
            }
        }
        getArticle()
        return () => {
            // 组件卸载，停止播放
            speak().cancel();
            // 计算本次阅读时间
            const timing = dayjs().valueOf() - startTime
            // 发送数据给后台
            console.log(tag);
            // 记录单次阅读时间
            const lastTime = JSON.parse(sessionStorage.getItem('timing')) ?? 0
            sessionStorage.setItem('timing', timing + lastTime)
        }
    }, [id, navigate])

    // 初始化沉浸模式状态 
    useEffect(() => {
        const localImmerse = JSON.parse(localStorage.getItem('isImmerse')) ?? false
        const localSize = JSON.parse(localStorage.getItem('fontSize')) ?? 16
        setIsImmerse(localImmerse)
        setSize(localSize)
    }, [])
    // 处理点赞事件
    const handleLove = () => {
        setNumGroup({ ...numGroup, loveNum: loveDone ? --numGroup.loveNum : ++numGroup.loveNum })
        setLoveDone(!loveDone)
    }
    // 处理收藏事件
    const handleCollect = () => {
        setNumGroup({ ...numGroup, collectNum: collect ? --numGroup.collectNum : ++numGroup.collectNum })
        setCollect(!collect)
    }
    // 跳转评论区
    const handleComment = () => {
        const anchorElement = document.getElementById('comment')
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" })
    }
    // 语音播放
    const handleSpeak = () => {
        speak(article.content).speak()
        if (isSpeak) {
            speak().pause()
            setIsSpeak(false)
        } else {
            speak().resume()
            setIsSpeak(true)
        }
    }
    // 沉浸模式
    const handleImmerse = () => {
        localStorage.setItem("isImmerse", !isImmerse)
        setIsImmerse(!isImmerse)
    }
    // 切换字体大小
    const handleSize = (value) => {
        setSize(value)
        localStorage.setItem('fontSize', value)
    }
    // 图片预览
    const previewImage = (e) => {
        if (e.target.tagName === 'IMG') {
            setVisible(true)
            const index = article.image_list.indexOf(e.target.src)
            const currentIndex = index === -1 ? 0 : index
            setPhotoIndex(currentIndex)
        }
    }
    // 处理侧边栏定位
    let scrollTop = 0
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
        <DetailWrapper style={isImmerse ? { minWidth: "1200px" } : {}} >
            {/* 骨架屏加载 */}
            <Skeleton active loading={artLoading} paragraph={{ rows: 16 }} round >
                {/* 左侧交互按钮 */}
                <div className="left-sidebar" >
                    <div className='left-box'>
                        <div className='left-clear'></div>
                        <div className='left-container'>
                            <LoveButton handleClick={handleLove} done={loveDone} key="love" content="点赞" type={0} number={numGroup.loveNum} />
                            <LoveButton handleClick={handleComment} key="comment" content="评论区" type={1} number={numGroup.commentNum} />
                            <LoveButton handleClick={handleCollect} done={collect} key="collect" content="收藏文章" type={2} number={numGroup.collectNum} />
                            <QrCode />
                            <div className='size-controller'>
                                <div className='controller-title'>字体大小</div>
                                <Slider onChange={handleSize} min={12} max={24} vertical value={size} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 文章内容 */}
                <div className="main" style={isImmerse ? { minWidth: "1200px", fontSize: size, textAlign: "center" } : { fontSize: size }} >
                    <div className="article-container">
                        <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
                        <div className="article-meta" style={isImmerse ? { justifyContent: "center" } : {}} >
                            <div className="article-type">原创</div>
                            <div className="article-time">{article.publish_time}</div>
                            <div className="article-author">{article?.media_user?.media_name} </div>
                        </div>
                        {/* 图片预览 */}
                        <PhotoProvider>
                            <PhotoSlider
                                images={article.image_list?.map(item => ({ src: item })) ?? []}
                                visible={visible}
                                onClose={() => setVisible(false)}
                                index={photoIndex}
                                onIndexChange={setPhotoIndex}
                            />
                            <article onClick={previewImage} dangerouslySetInnerHTML={{ __html: article.content }} />
                        </PhotoProvider>
                    </div>
                    <div id='comment' className="comment-container">
                        <div className='comment-content'>
                            这里是评论区
                        </div>
                    </div>
                </div>
                {/* 右侧侧边栏 */}
                <div className="right-sidebar" style={isImmerse ? { display: "none" } : {}} >
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
                    <CenterLine title="作者热门文章" />
                    {/* 作者热门文章 */}
                    <ArticleSide articleList={articleList[0]} />
                    <CenterLine title="相关推荐" />
                    <ArticleSide articleList={articleList[1]} />
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
                        <CenterLine title="相关推荐" />
                        <ArticleSide articleList={articleList[1]} />
                    </div>
                    {/* 热榜 */}
                    <div className="hot-list"></div>
                </div>
                {/* 全屏右下角按钮 */}
                <div className="right-button">
                    <div className="right-end-box">
                        <div className="right-clear"></div>
                        <div className="right-container">
                            <LoveButton
                                handleClick={handleSpeak}
                                done={isSpeak}
                                key="speak"
                                content={isSpeak ? '关闭' : "开启语音播放"}
                                type={6}
                            />
                            <LoveButton
                                handleClick={handleImmerse}
                                done={isImmerse}
                                key="immerse"
                                content={isImmerse ? '关闭沉浸模式' : "开启沉浸模式"}
                                type={3}
                            />
                            <BackToTop />
                        </div>
                    </div>
                </div>
            </Skeleton>
        </DetailWrapper >
    );
})

export default Detail;