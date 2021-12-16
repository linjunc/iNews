import React, { useEffect, useMemo, useState } from 'react'
import { List, message } from 'antd'

import { throttle } from 'lodash'
import { useLocation } from 'react-router-dom'
import { HomeContainer } from './style'
import Search from './components/Search'
import Article from './components/Article'
import Loading from './components/Loading'
import RightContent from './components/RightContent'

import { getArticles } from '../../services/home'
import HotArticle from './components/HotArticle'
let num = 0
let tag = 'recommend'
let isOnGet = false
let hasMore = true
let msgTimer = null
const Home = (props) => {
  const [onLoading, setOnLoading] = useState(false)
  const [articleList, setArticleList] = useState([])
  const [isFixed, setIsFixed] = useState(false)
  // 数组打乱方法
  const shuffle = (arr) => {
    let m = arr.length,
      i
    while (m) {
      i = (Math.random() * m--) >>> 0
      ;[arr[m], arr[i]] = [arr[i], arr[m]]
    }
  }
  const getArticleList = async (tag) => {
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
      setOnLoading(true) //开启加载中
      const data = await getArticles({
        tag,
        n: 8,
        skip: num,
      })
      num = num + 8 //跳过的条数增加

      const newList = data?.data?.article_list ? data.data.article_list : []
      if (!newList.length) hasMore = false
      shuffle(newList)
      //添加到文章列表
      setArticleList((val) => [...val, ...newList])

      // setHomeLoading(false) //骨架消失
    } catch (error) {
      // throttle()
      message.error('数据获取失败,请重试！')
    } finally {
      isOnGet = false
      setOnLoading(false) //取消加载中
    }
  }
  const location = useLocation()
  useMemo(() => {
    hasMore = true
    num = 0 //跳转条数重新置零
    setArticleList([]) //列表清空

    tag = location.state?.current ? location.state.current : tag

    console.log(tag)
    if (tag !== 'app') {
      getArticleList(tag)
      let timer = setTimeout(() => {
        console.log(document.getElementsByClassName('content')[0].offsetTop)
        document.documentElement.scrollTop =
          document.getElementsByClassName('content')[0].offsetTop
        clearTimeout(timer)
      }, 0)
    }

    return tag
  }, [location.state])

  const showHot = () => {
    if (tag === 'app') return <HotArticle />
    return (
      <div className="content">
        <div className="main">
          <List
            dataSource={articleList}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }} key={item.article_id}>
                <Article data={item} />
              </List.Item>
            )}
          />
          {showLoad()}
        </div>
        <div className={isFixed ? 'home_right fixed_box' : 'home_right'}>
          <RightContent />
        </div>
      </div>
    )
  }

  const showLoad = () => {
    if (onLoading) return <Loading />
  }

  let topValue = 0

  useEffect(() => {
    const handelToBottom = throttle((e) => {
      const { clientHeight, scrollHeight, scrollTop } =
        e.target.scrollingElement

      const isBottom = scrollTop + clientHeight + 10 > scrollHeight //是否到达底部

      if (scrollTop >= 700) setIsFixed(true)
      else setIsFixed(false)
      // 下滚
      if (scrollTop > topValue) {
        if (isBottom && tag !== 'app') {
          getArticleList(tag)
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
      <Search></Search>
      {showHot()}
    </HomeContainer>
  )
}

export default Home
