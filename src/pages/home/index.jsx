import React, { useEffect, useMemo, useState, useContext, memo, useRef } from 'react'
import { List, message } from 'antd'

import { throttle } from 'lodash'
import {useMemoizedFn} from 'ahooks'
import { useLocation } from 'react-router-dom'
import { HomeContainer } from './style'

import Nav from '../../components/Nav'
import CenterSearch from './components/CenterSearch'
import Article from './components/Article'
import Loading from '../../components/Loading'
import RightContent from './components/RightContent'
import HomeToTop from '../../components/HomeToTop'
import TagFirst from './components/TagFirst'
import BtmArticles from './components/BtmArticles'
import HotArticle from './components/HotArticle'
import Feedback from '../../components/Feedback'

import { getArticles } from '../../services/home'
import { shuffle } from '../../utils/shuffle'
import { userContext } from '../../models/context'

let isOnGet = false
let msgTimer = null
const Home = memo(() => {
  const [onLoadingBtm, setOnLoadingBtm] = useState(false)
  const [onLoadingTop, setOnLoadingTop] = useState(false)
  const [articleList, setArticleList] = useState([])
  const [hotArr, setHotArr] = useState([])
  const { userInfo } = useContext(userContext)
  const [num, setNum] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [tag, setTag] = useState('app')

  //获取文章
  const getArticleList = useMemoizedFn(async (tag, isBtm) => {
    if (!hasMore) {
      if (!msgTimer) {
        message.warn('该类新闻都在这里了，看看其他类的吧!')
        msgTimer = setTimeout(() => {
          clearTimeout(msgTimer)
          msgTimer = null
        }, 5000)
      }
      return
    }
    if (isOnGet) return
    isOnGet = true
    try {
      //开启加载中
      if (isBtm) setOnLoadingBtm(true)
      else setOnLoadingTop(true)
      const data = await getArticles({
        tag,
        n: 8,
        skip: num,
      })
      // num = num + 8 //跳过的条数增加
      setNum(num + 8)
      setHasMore(data.data.has_more)

      const newList = data?.data?.article_list ? data.data.article_list : []
      // hasMore = data.data.has_more
      shuffle(newList)
      //添加到文章列表
      setArticleList((val) => [...val, ...newList])
      // setArticles(tag, newList, num, hasMore)
      
    } catch (error) {
      message.error('数据获取失败,请重试!')
    } finally {
      isOnGet = false
      //取消加载中
      setOnLoadingBtm(false)
      setOnLoadingTop(false)
    }
  })

  const location = useLocation()
  useEffect(() => {
    setTag(location.state?.current ? location.state.current : tag)
    setHasMore(true)
    setNum(0)
    setArticleList([]) //列表清空
  }, [location.state])

  useEffect(() => {
    if (tag !== 'app') {
      getArticleList(tag, false)
     let timer = setTimeout(() => {
       document.documentElement.scrollTop =
         document.getElementsByClassName('content')[0].offsetTop - 55
       clearTimeout(timer)
     }, 0)
   }
  }, [tag])

  const showHot = useMemoizedFn(() => {
    //展示热点页或列表页
    if (tag === 'app') return <HotArticle hotArr={hotArr} />
    return (
      <div className="content">
        <div className="main">
          <Nav style={{ height: 54 }}></Nav>
          {onLoadingTop ? <Loading/> : null}
          <List
            dataSource={articleList}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }} key={item.article_id}>
                <Article data={item} current={tag} />
              </List.Item>
            )}
          />
          {onLoadingBtm ? <Loading/> : null}
          {hasMore ? null : <div className="btmLine">
          <span className="title">已经到最低了噢~</span>
        </div>}
          {btmAritles(hotArr)}
        </div>
        <RightContent hotArr={hotArr} />
      </div>
    )
  })


  const btmAritles = (arr) => {
    if (arr?.length && tag !== 'recommend') {
      let newArr = [...arr]
      shuffle(newArr)
      newArr = newArr.filter((item) => item?.has_image)
      newArr = newArr.slice(0, 3)
      return <BtmArticles current={tag} newArr={newArr} />
    }
  }

  let topValue = 0

  useEffect(() => {
    // let hotArr_sess = JSON.parse(sessionStorage.getItem('hotArr') ?? '[]')
    // if (!hotArr_sess || !hotArr_sess.length) {
      getArticles({
        tag: 'hot',
        n: 12,
        skip: 0,
      }).then(
        (res) => {
          // hotArr_sess = res.data.article_list
          const data = res.data.article_list
          if (data?.length) {
            // sessionStorage.setItem('hotArr', JSON.stringify(hotArr_sess))
            setHotArr(data)
          }
        },
        (err) => message.error('加载失败，请重试!'),
      )
    // } else setHotArr(hotArr_sess)

    const handelToBottom = throttle(handleBo, 100)

    window.addEventListener('scroll', handelToBottom)

    return () => {
      window.removeEventListener('scroll', handelToBottom)
    }
  }, [])

  const handleBo = useMemoizedFn((e) => {
    const { clientHeight, scrollHeight, scrollTop } =
      e.target.scrollingElement
    //clientHeight 元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距
    //scrollHeight 元素内容高度的度量，包括由于溢出导致的视图中不可见内容
    //scrollTop 元素的内容垂直滚动的像素数
    const isBottom = scrollTop + clientHeight + 10 > scrollHeight //是否到达底部

    // 下滚
    if (scrollTop > topValue) {
      if (isBottom && tag !== 'app') {
        getArticleList(tag, isBottom)
      }
    }
    setTimeout(function () {
      topValue = scrollTop
    }, 0)
  })

  return (
    <HomeContainer>
      <CenterSearch></CenterSearch>
      {showHot()}
      <div className="hideBottom">
        <HomeToTop />
      </div>
      <TagFirst userTag={userInfo?.userTag ?? []} />
      <div style={{position: 'fixed', bottom: '100px', right: '100px'}}>
        <Feedback done={true} />
      </div>
    </HomeContainer>
  )
})

export default Home
