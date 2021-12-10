import React, { useEffect, useMemo, useState } from 'react'
import { Skeleton, List, message } from 'antd'

import { throttle } from 'lodash'
import { useLocation } from 'react-router-dom'
import { HomeContainer } from './style'
import Article from './components/Article'
import Loading from './components/Loading'

import { getArticles } from '../../services/home'
let num = 0
let tag = 'recommend'
let isOnGet = false
const Home = (props) => {
  const [onLoading, setOnLoading] = useState(false)
  const [homeLoading, setHomeLoading] = useState(true) //骨架
  const [articleList, setArticleList] = useState([])
  const getArticleList = async (tag) => {
    if (isOnGet) return
    isOnGet = true
    try {
      setOnLoading(true) //开启加载中
      const data = await getArticles({
        tag,
        n: 10,
        skip: num,
      })
      num = num + 10 //跳过的条数增加

      const newList = data?.data?.article_list ? data.data.article_list : []
      //添加到文章列表
      setArticleList((val) => [...val, ...newList])

      setHomeLoading(false) //骨架消失
    } catch (error) {
      message.error('数据获取失败,请重试！')
    } finally {
      isOnGet = false
      setOnLoading(false) //取消加载中
    }
  }
  const location = useLocation()
  // const channel =
  useMemo(() => {
    setHomeLoading(true) //骨架出现

    let scrollTopTimer = setInterval(function () {
      //回到顶部
      let top = document.body.scrollTop || document.documentElement.scrollTop
      let speed = top / 30
      document.documentElement.scrollTop -= speed
      if (top === 0) {
        clearInterval(scrollTopTimer)
      }
    }, 5)
    num = 0 //跳转条数重新置零
    setArticleList([]) //列表清空

    tag = location.state?.current ? location.state.current : tag

    getArticleList(tag)

    return location.state?.current ?? 'app'
  }, [location.state])

  const showLoad = () => {
    if (onLoading) return <Loading />
  }

  useEffect(() => {
    const handelToBottom = throttle((e) => {
      const { clientHeight, scrollHeight, scrollTop } =
        e.target.scrollingElement

      const isBottom = scrollTop + clientHeight + 10 > scrollHeight //是否到达底部

      if (isBottom) {
        getArticleList(tag)
      }
    }, 1000)

    window.addEventListener('scroll', handelToBottom)

    return () => {
      window.removeEventListener('scroll', handelToBottom)
    }
  }, [])

  return (
    <HomeContainer>
      {/* <Skeleton active loading={homeLoading} paragraph={{ rows: 16 }} round> */}
      {/* {channel} */}
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
        <div className="home_right"></div>
      </div>
      {/* </Skeleton> */}
    </HomeContainer>
  )
}

export default Home
