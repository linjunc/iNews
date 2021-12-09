import React, { useEffect, useMemo, useState } from 'react'
import { List } from 'antd'

// import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom'
import { HomeContainer } from './style'
import Article from './components/Article'

import { getArticles } from '../../services/home'
const Home = (props) => {
  const location = useLocation()
  const channel = useMemo(
    () => location.state?.current ?? '首页',
    [location.state],
  )

  const [articleList, setArticleList] = useState([])

  const [onFinish, setOnFinish] = useState(true)

  useEffect(() => {
    const getArticleList = async () => {
      const data = await getArticles({
        tag: 'recommend',
        n: 10,
        skip: 0,
      })
      console.log(data)
      setOnFinish(false)
      setArticleList([...articleList, ...data.data.article_list])
    }
    getArticleList()
    return () => {}
  }, [])

  return (
    <HomeContainer>
      {channel}
      <div
      // style={{ height: '3000px' }}
      >
        <List
          dataSource={articleList}
          loading={onFinish}
          loadMore={<p style={{ textAlign: 'center' }}>正在加载更多</p>}
          renderItem={(item) => (
            <List.Item key={item.article_id}>
              <Article data={item} />
            </List.Item>
          )}
        />
      </div>
    </HomeContainer>
  )
}

export default Home
