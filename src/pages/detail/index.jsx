// 文章详情
import React, { memo, useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Skeleton, Button, message, Modal } from 'antd'
import { throttle } from 'lodash'
import { PhotoProvider, PhotoSlider } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import Comments from './components/Comments'

import {
  collectArticle,
  digArticle,
  getArticleByTag,
  getArticleDetail,
  getArticleList,
  readTime,
} from '../../services/detail'
import { getAllImg } from '../../utils/getImg'
import { speak } from '../../utils/speak'
import { getScrollTop } from '../../utils/scrollHeight'
import BackToTop from './components/BackToTop'
import ArticleSide from './components/ArticleSide'
import CenterLine from './components/CenterLine'
import AfterLook from './components/AfterLook/'
import SpeakArticle from './components/SpeakArticle'
import BannerCard from './components/BannerCard'
import LeftSide from './components/LeftSide'
import LoveButton from '../../components/LoveButton'
import { DetailWrapper } from './style'
import { FocusAuthor } from '../../services/user'
import RenderIfVisible from 'react-render-if-visible'
// dayjs 配置
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)

// 采用 memo 对子组件重新渲染造成的影响进行控制
const Detail = memo(() => {
  // 状态定义
  const { id } = useParams()
  const navigate = useNavigate()
  const [artLoading, setArtLoading] = useState(false) // 骨架屏显示
  const [article, setArticle] = useState({}) // 文章数据
  const [articleList, setArticleList] = useState([]) // 文章列表数据
  const [show, setShow] = useState(false) // 侧边栏固定状态
  const [isImmerse, setIsImmerse] = useState(false) // 沉浸模式
  const [isAfter, setIsAfter] = useState(false)
  const [size, setSize] = useState(16) // 文章字体大小，默认16
  const [isSpeak, setIsSpeak] = useState(false) // 语音播报的状态
  const [visible, setVisible] = useState(false) // 预览开启
  const [photoIndex, setPhotoIndex] = useState(0) //当前预览的第几张
  const [hasToken, setHasToken] = useState(false)
  const [numGroup, setNumGroup] = useState({
    loveNum: 0,
    commentNum: 0,
    collectNum: 0,
    loveDone: false,
    collect: false,
    focus: false,
    read: false,
  })
  const timeRef = useRef(0)
  const tagRef = useRef('')
  // 初始化文章数据
  useEffect(() => {
    const getArticle = async () => {
      setArtLoading(true)
      setArticleList([])
      try {
        const res = await getArticleDetail({ item_id: id })
        const { article, judge } = res.data
        // 存储文章点赞数据，点赞状态迁移
        setNumGroup({
          loveNum: article.digg_count,
          commentNum: article.comment_count,
          collectNum: article.like_count,
          loveDone: judge.is_digg,
          collect: judge.is_like,
          focus: judge.is_follow,
          read: judge.is_read,
        })
        // 处理时间
        article.publish_time = dayjs
          .unix(article.publish_time)
          .format('YYYY-MM-DD HH:mm')
        setArticle(article)
        setArtLoading(false)
        const requestArr = [
          // 获取用户热门文章
          getArticleList({
            user_id: article.media_id,
            n: '3',
            skip: '0',
          }),
          // 获取标签相关的文章
          getArticleByTag({
            tag: article.tag,
            n: '3',
            skip: '0',
          }),
        ]
        const resArr = await Promise.all(requestArr)
        const [userArticle, tagArticle] = [resArr[0], resArr[1]]
        // 热门文章数据  标签文章数据
        const [articleList, tagArticleList] = [
          userArticle.data.article_list,
          tagArticle.data.article_list,
        ]
        const tempList = [articleList, tagArticleList]
        // 计算到当前时间的距离
        tempList.map((item) =>
          item.forEach((article) => {
            article.publish_time = dayjs(
              parseInt(article.publish_time + '000'),
            ).fromNow()
          }),
        )
        // 添加文章列表数据
        setArticleList([articleList, tagArticleList])
        // 用户阅读时间过长提醒
        const readLongTime = sessionStorage.getItem('timing')
        // 一个小时
        if (readLongTime > 3600000) {
          message.warn('您本次阅读时间已经持续了一个小时，请稍作休息噢~')
        }
        // 成功获取文章后，记录当前的时间戳，以及文章的标签
        timeRef.current = dayjs().valueOf()
        tagRef.current = article.tag
      } catch (error) {
        // 获取失败直接返回首页
        message.error('加载失败，请重试')
        navigate('/')
        setArtLoading(false)
      }
    }
    getArticle()
    return () => {
      // 组件卸载，停止播放
      speak().cancel()
      // 发送数据给后台
      // 当没有数据时，不做处理
      const token = localStorage.getItem('token') || false
      console.log(token)
      if (
        tagRef.current &&
        dayjs().valueOf() - timeRef.current > 20000 &&
        token
      ) {
        // 计算本次阅读时间
        const timing = dayjs().valueOf() - timeRef.current
        // 记录单次阅读时间
        readTime({ tag: tagRef.current, read_time: timing })
        const lastTime = JSON.parse(sessionStorage.getItem('timing')) ?? 0
        // 临时存储单次阅读时间到本地
        sessionStorage.setItem('timing', timing + lastTime)
      }
    }
  }, [id, navigate])

  // 初始化沉浸模式状态
  useEffect(() => {
    const localImmerse = JSON.parse(localStorage.getItem('isImmerse')) ?? false
    const localSize = JSON.parse(localStorage.getItem('fontSize')) ?? 16
    const localToken = JSON.parse(localStorage.getItem('token')) ?? null
    setIsImmerse(localImmerse)
    setSize(localSize)
    setHasToken(localToken)
  }, [])
  // 处理点赞事件
  const handleLove = () => {
    if (hasToken) {
      setNumGroup({
        ...numGroup,
        loveNum: numGroup.loveDone ? --numGroup.loveNum : ++numGroup.loveNum,
        loveDone: !numGroup.loveDone,
      })
      digArticle({ article_id: article.item_id })
    } else {
      message.info('请先登录')
    }
  }
  // 处理收藏事件
  const handleCollect = () => {
    if (hasToken) {
      setNumGroup({
        ...numGroup,
        collectNum: numGroup.collect
          ? --numGroup.collectNum
          : ++numGroup.collectNum,
        collect: !numGroup.collect,
      })
      collectArticle({ article_id: article.item_id })
    } else {
      message.info('请先登录')
    }
  }
  // 处理关注用户事件
  const focusUser = () => {
    if (hasToken) {
      if (numGroup.focus) {
        Modal.confirm({
          title: '你确定要取消关注作者吗？',
          onOk: () => {
            setNumGroup({
              ...numGroup,
              focus: !numGroup.focus,
            })
            FocusAuthor({ media_id: article.media_id })
          },
        })
      } else {
        setNumGroup({
          ...numGroup,
          focus: !numGroup.focus,
        })
        FocusAuthor({ media_id: article.media_id })
      }
    } else {
      message.info('请先登录')
    }
  }
  // 跳转评论区
  const handleComment = () => {
    const anchorElement = document.getElementById('comment')
    anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
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
    localStorage.setItem('isImmerse', !isImmerse)
    setIsImmerse(!isImmerse)
  }
  // 切换字体大小
  const handleSize = (value) => {
    setSize(value)
    localStorage.setItem('fontSize', value)
  }
  // 图片预览
  const previewImage = (e) => {
    const allImgArr = getAllImg(article)
    if (e.target.tagName === 'IMG') {
      setVisible(true)
      const index = allImgArr?.indexOf(e.target.src)
      const currentIndex = index === -1 ? 0 : index
      setPhotoIndex(currentIndex)
    }
  }
  // 处理侧边栏定位
  let scrollTop = 0
  // 获取距离顶部的距离
  const bindHandleScroll = throttle(() => {
    scrollTop = getScrollTop()
    // 大于一定距离后显示固定
    scrollTop >= 1000 ? setShow(true) : setShow(false)
  }, 100)
  // 初始化滚动事件
  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll)
    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DetailWrapper style={isImmerse ? { minWidth: '1200px' } : {}}>
      {/* 骨架屏加载 */}
      <Skeleton active loading={artLoading} paragraph={{ rows: 16 }} round>
        {/* 左侧交互按钮 */}
        <LeftSide
          numGroup={numGroup}
          size={size}
          handleCollect={handleCollect}
          handleComment={handleComment}
          handleLove={handleLove}
          handleSize={handleSize}
        />
        {/* 文章内容 */}
        <div
          className="main"
          style={
            isImmerse
              ? { minWidth: '1200px', fontSize: size, textAlign: 'center' }
              : { fontSize: size }
          }
        >
          <div className="article-container">
            <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
            <div
              className="article-meta"
              style={isImmerse ? { justifyContent: 'center' } : {}}
            >
              <div className="article-type">原创</div>
              <div className="article-time">{article.publish_time}</div>
              <div className="article-author">
                {article?.media_user?.media_name}{' '}
              </div>
            </div>
            {/* 图片预览 */}
            <PhotoProvider>
              <PhotoSlider
                images={
                  getAllImg(article)?.map((item) => ({ src: item })) ?? []
                }
                visible={visible}
                onClose={() => setVisible(false)}
                index={photoIndex}
                onIndexChange={setPhotoIndex}
              />
              <article
                onClick={previewImage}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </PhotoProvider>
          </div>
          {/* 评论区 */}
          <div id="comment" className="comment-container">
            <RenderIfVisible defaultHeight={200}>
              <Comments id={id}></Comments>
            </RenderIfVisible>
          </div>
        </div>
        {/* 右侧侧边栏 */}
        <div
          className="right-sidebar"
          style={isImmerse ? { display: 'none' } : {}}
        >
          {/* 作者信息 */}
          <div className="author-info">
            <div
              onClick={() => {
                navigate(`/user/${article.media_id}`)
              }}
              className="author-head"
            >
              <img src={article?.media_user?.avatar_url} alt="" />
            </div>
            <div className="author-name">{article?.media_user?.media_name}</div>
            <div className="author-des">{article?.media_user?.media_info}</div>
            <Button
              onClick={focusUser}
              type="primary"
              style={
                numGroup.focus
                  ? { backgroundColor: '#2ecc71', border: 'none' }
                  : {}
              }
              className="author-love"
            >
              {numGroup.focus ? '已关注' : '+ 关注'}
            </Button>
          </div>
          {/* 右侧文章列表 */}
          <Skeleton
            active
            loading={!articleList[1]}
            paragraph={{ rows: 16 }}
            round
          >
            <CenterLine title="作者热门文章" />
            {/* 作者热门文章 */}
            <ArticleSide articleList={articleList[0]} />
            <CenterLine title="相关推荐" />
            <ArticleSide articleList={articleList[1]} />
          </Skeleton>
          {/* 广告 */}
          <BannerCard />
          {/* 下滑过长后的固定右侧 */}
          <div className={show ? 'sticky-box show' : 'sticky-box'}>
            {/* 作者信息 */}
            <div className="author-info">
              <div
                onClick={() => {
                  navigate(`/user/${article.media_id}`)
                }}
                className="author-head"
              >
                <img src={article?.media_user?.avatar_url} alt="" />
              </div>
              <div className="author-name">
                {article?.media_user?.media_name}
              </div>
              <div className="author-des">
                {article?.media_user?.media_info}
              </div>
              <Button
                onClick={focusUser}
                type="primary"
                style={
                  numGroup.focus
                    ? { backgroundColor: '#2ecc71', border: 'none' }
                    : {}
                }
                className="author-love"
              >
                {numGroup.focus ? '已关注' : '+ 关注'}
              </Button>
            </div>
            {/* 广告 */}
            <BannerCard />
            <Skeleton
              active
              loading={!articleList[1]}
              paragraph={{ rows: 16 }}
              round
            >
              <CenterLine title="相关推荐" />
              <ArticleSide articleList={articleList[1]} />
            </Skeleton>
          </div>
          {/* 热榜 */}
          <div className="hot-list"></div>
        </div>
        {/* 全屏右下角按钮 */}
        <div className="right-button">
          <div className="right-end-box">
            <div className="right-clear"></div>
            <div className="right-container">
              {/* 稍后再看 */}
              <AfterLook
                isAfter={isAfter}
                setIsAfter={setIsAfter}
                article={article}
              />
              <SpeakArticle isSpeak={isSpeak} handleSpeak={handleSpeak} />
              <LoveButton
                handleClick={handleImmerse}
                done={isImmerse}
                key="immerse"
                content={isImmerse ? '关闭沉浸模式' : '开启沉浸模式'}
                type={3}
              />
              <BackToTop />
            </div>
          </div>
        </div>
      </Skeleton>
    </DetailWrapper>
  )
})

export default Detail
