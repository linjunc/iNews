import React, { useEffect, useMemo, useState, memo, useContext } from 'react'
import { List, message, Card, Avatar } from 'antd'

import { throttle } from 'lodash'
import { useLocation } from 'react-router-dom'
import { HomeContainer } from './style'
import Nav from '../../components/Nav'
import CenterSearch from './components/CenterSearch'
import Article from './components/Article'
import Loading from './components/Loading'
import RightContent from './components/RightContent'
import HomeToTop from '../../components/HomeToTop'
import TagFirst from './components/TagFirst'

import { getArticles } from '../../services/home'
import HotArticle from './components/HotArticle'
import { shuffle } from '../../utils/shuffle'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../models/context'
let num = 0
let tag = 'app'
let isOnGet = false
let hasMore = true
let msgTimer = null
const { Meta } = Card
const Home = memo(() => {
  const [onLoadingBtm, setOnLoadingBtm] = useState(false)
  const [onLoadingTop, setOnLoadingTop] = useState(false)
  const [articleList, setArticleList] = useState([])
  const [hotArr, setHotArr] = useState([])
  const navigate = useNavigate()
  const { userInfo } = useContext(userContext)

  const toDetail = (data) => {
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }
  const toUser = (data) => {
    //跳转主页
    navigate(`/user/${data.media_id}`) // id
  }
  //文章存session
  const setArticles = (tag, newList, num, hasMore) => {
    let articlesList = JSON.parse(sessionStorage.getItem(`${tag}_articles`))
    if (!articlesList) articlesList = { hasMore: true, num: 0, list: [] }

    articlesList.num = num
    articlesList.hasMore = hasMore
    articlesList.list.push(...newList)
    sessionStorage.setItem(`${tag}_articles`, JSON.stringify(articlesList))
  }
  const getArticleList = async (tag, isBtm) => {
    if (!hasMore) {
      if (!msgTimer) {
        msgTimer = setTimeout(() => {
          message.warn('该类新闻都在这里了，看看其他类的吧！')
          clearTimeout(msgTimer)
          msgTimer = null
        }, 2000)
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
      num = num + 8 //跳过的条数增加

      const newList = data?.data?.article_list ? data.data.article_list : []
      hasMore = data.data.has_more
      shuffle(newList)
      //添加到文章列表
      setArticleList((val) => [...val, ...newList])
      setArticles(tag, newList, num, hasMore)
    } catch (error) {
      message.error('数据获取失败,请重试！')
    } finally {
      isOnGet = false
      //取消加载中
      setOnLoadingBtm(false)
      setOnLoadingTop(false)
    }
  }
  const location = useLocation()
  useMemo(() => {
    tag = location.state?.current ? location.state.current : tag

    let articlesList = JSON.parse(sessionStorage.getItem(`${tag}_articles`))
    if (articlesList) {
      hasMore = articlesList.hasMore
      num = articlesList.num
      setArticleList(articlesList.list)
    } else {
      hasMore = true
      num = 0 //跳转条数重新置零
      setArticleList([]) //列表清空
    }

    if (tag !== 'app') {
      if (hasMore) getArticleList(tag, false)
      let timer = setTimeout(() => {
        document.documentElement.scrollTop =
          document.getElementsByClassName('content')[0].offsetTop - 55
        clearTimeout(timer)
      }, 0)
    }

    return tag
  }, [location.state])

  const showHot = () => {
    if (tag === 'app') return <HotArticle hotArr={hotArr} />
    return (
      <div className="content">
        <div className="main">
          <Nav style={{ height: 54 }}></Nav>
          {showLoadTop()}
          <List
            dataSource={articleList}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }} key={item.article_id}>
                <Article data={item} />
              </List.Item>
            )}
          />
          {showLoadBtm()}
          {hasNone()}
          {btmAritles(hotArr)}
        </div>
        <RightContent hotArr={hotArr} />
      </div>
    )
  }

  const showLoadBtm = () => {
    if (onLoadingBtm) return <Loading />
  }
  const showLoadTop = () => {
    if (onLoadingTop) return <Loading />
  }
  const hasNone = () => {
    if (!hasMore)
      return (
        <div className="btmLine">
          <span className="title">已经到最低了噢~</span>
        </div>
      )
  }

  const btmAritles = (arr) => {
    if (arr?.length && tag !== 'recommend') {
      let newArr = [...arr]
      shuffle(newArr)
      newArr = newArr.filter((item) => item?.has_image)
      newArr = newArr.slice(0, 3)
      return (
        <div>
          <div
            style={{
              width: 710,
              marginLeft: -20,
              height: 20,
              backgroundColor: '#f4f5f5',
            }}
          ></div>
          <div className="btmLine">
            <span className="title">文章推荐</span>
          </div>
          <div
            className="btm_aritles"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}
          >
            {newArr.map((item) => (
              <Card
                key={item.article_id}
                style={{ width: 200 }}
                cover={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      onClick={() => toDetail(item)}
                      style={{
                        cursor: 'pointer',
                        width: 200,
                        height: 140,
                        objectFit: 'cover',
                      }}
                      alt={item.title}
                      src={item.image_url}
                    />
                    <h4 className="btm_aritles_title">{item.title}</h4>
                  </div>
                }
              >
                <div
                  className="media_user"
                  onClick={() => toUser(item)}
                  style={{ cursor: 'pointer', height: 50 }}
                >
                  <Avatar src={item.media_user.avatar_url} />
                  <div className="mediaDetail">
                    <h4 className="mediaName">{item.media_user.media_name}</h4>
                    <p className="description">{item.media_user.media_info}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    }
  }

  let topValue = 0

  useEffect(() => {
    let hotArr_sess = JSON.parse(sessionStorage.getItem('hotArr'))
    if (!hotArr_sess) {
      getArticles({
        tag: 'hot',
        n: 12,
        skip: 0,
      }).then(
        (res) => {
          hotArr_sess = res.data.article_list
          sessionStorage.setItem('hotArr', JSON.stringify(hotArr_sess))
          setHotArr(hotArr_sess)
        },
        (err) => message.error(err),
      )
    } else setHotArr(hotArr_sess)

    const handelToBottom = throttle((e) => {
      const { clientHeight, scrollHeight, scrollTop } =
        e.target.scrollingElement

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
    }, 100)

    window.addEventListener('scroll', handelToBottom)

    return () => {
      window.removeEventListener('scroll', handelToBottom)
    }
  }, [])

  return (
    <HomeContainer>
      <CenterSearch></CenterSearch>
      {showHot()}
      <div className="hideBottom">
        <HomeToTop />
      </div>
      <TagFirst userTag={userInfo?.userTag ?? []} />
    </HomeContainer>
  )
})

export default Home
