import React, { memo, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import { getLocal } from '../../../../utils/storage'
import { lazyLoad } from '../../../../utils/optimize-fn'
import { throttle } from 'lodash'

import { collectArticle, digArticle } from '../../../../services/detail'
import noImg from '../../../../assets/home/404.svg'

import { ArticleItemWrapper } from './style'
import { message } from 'antd'

// dayjs 配置
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime)
export default memo(function NewsItem(props) {
  const navigate = useNavigate()
  const { newsInfo, index } = props
  const {
    article_id,
    comment_count,
    like_count: collect_count,
    read_count,
    digg_count: like_count,
    is_like,
    is_digg,
    image_url,
    publish_time,
    title,
    abstract,
    media_user,
    media_id,
    tag_name,
    tag,
  } = newsInfo
  // 记录图片的dom节点，用于懒加载给src属性赋值
  const imgRef = useRef()

  // 管理用户是否点赞以及点赞数目的状态
  const [likeInfo, setLikeInfo] = useState({
    likeNum: like_count,
    isLike: is_digg,
  })
  const { likeNum, isLike } = likeInfo

  // 管理用户是否收藏以及收藏数目的状态
  const [collectInfo, setCollectInfo] = useState({
    collectNum: collect_count,
    isCollect: is_like,
  })
  const { collectNum, isCollect } = collectInfo

  useEffect(() => {
    const imgDom = imgRef.current
    // 如果该新闻有图片，则需要为其监听滚动事件
    if (imgDom) {
      // 一开始的前5张图片为了确保用户一开始就能看见，所以是需要立即渲染的
      if (index < 5) {
        imgDom.src = image_url
        imgDom.onload = () => (imgDom.style.opacity = 1)
      } else {
        const imgLazyLoad = throttle(
          lazyLoad(
            () => {
              imgDom.src = image_url
              imgDom.onload = () => {
                // 图片加载完毕之后显示图片
                imgDom.style.opacity = 1
                window.removeEventListener('scroll', imgLazyLoad)
              }
            },
            imgDom,
            50,
          ),
          200,
        )
        window.addEventListener('scroll', imgLazyLoad)
        return () => {
          window.removeEventListener('scroll', imgLazyLoad)
        }
      }
    }
  }, [image_url, index])

  // 用户点击点赞按钮后点赞/取消点赞新闻
  const likeNews = (e) => {
    e.stopPropagation()
    if (getLocal('token')) {
      setLikeInfo({
        likeNum: isLike ? likeNum - 1 : likeNum + 1,
        isLike: !isLike,
      })
      // 发送点赞/取消点赞请求
      digArticle({
        article_id,
      })
    } else {
      message.warn('您还没有登录哦！')
    }
  }

  // 用户点击收藏按钮后收藏/取消收藏新闻
  const collectNews = (e) => {
    e.stopPropagation()
    if (getLocal('token')) {
      setCollectInfo({
        collectNum: isCollect ? collectNum - 1 : collectNum + 1,
        isCollect: !isCollect,
      })
      // 发送收藏/取消收藏请求
      collectArticle({
        article_id,
      })
    } else {
      message.warn('您还没有登录哦！')
    }
  }

  // 点击标签后去往对应标签下的文章列表页
  const goToCategory = (e) => {
    e.stopPropagation()
    navigate('/', { state: { current: tag } })
  }

  return (
    <ArticleItemWrapper
      onClick={(e) => article_id && navigate(`/detail/${article_id}`)}
    >
      <div className="meta-container">
        <Link
          to={`/user/${media_id}`}
          className="username text-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          {media_user?.media_name || '未知'}
        </Link>
        <span className="release-time">
          {
            // 计算到当前时间的距离
            dayjs(parseInt(publish_time + '000')).fromNow()
          }
        </span>
        <span className="category" onClick={goToCategory}>
          {tag_name || tag}
        </span>
      </div>
      <div className="content-container">
        <div className="main-container">
          <h1 className="title text-nowrap">{title}</h1>
          <p className="abstract text-nowrap">{abstract}</p>
          <ul className="action-list middle-item">
            <li className="item middle-item">
              <i className="read-icon"></i>
              <span className="read-num">{read_count}</span>
            </li>
            <li className="item middle-item" onClick={likeNews}>
              <i className={isLike ? 'like-icon' : 'unlike-icon'}></i>
              <span className={'like-num' + (isLike ? ' active' : '')}>
                {likeNum || '点赞'}
              </span>
            </li>
            <li className="item middle-item">
              <i className="uncomment-icon"></i>
              <span className="comment-num">{comment_count || '评论'}</span>
            </li>
            <li className="item middle-item" onClick={collectNews}>
              <i
                className={isCollect ? 'has-collect-icon' : 'collect-icon'}
              ></i>
              <span className={'collect-num' + (isCollect ? ' active' : '')}>
                {collectNum || '收藏'}
              </span>
            </li>
          </ul>
        </div>
        {image_url && image_url !== '”“' && (
          <div className="img-wrapper">
            <img
              className="news-img"
              alt="新闻图片"
              ref={imgRef}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = noImg
              }}
            />
          </div>
        )}
      </div>
    </ArticleItemWrapper>
  )
})
