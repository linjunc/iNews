// 文章项组件
import React from 'react'
import { BtmArticlescontainer } from './style'
import { Card, Avatar } from 'antd'

import { useNavigate } from 'react-router-dom'

const BtmArticles = ({ newArr, current }) => {
  const navigate = useNavigate()
  const toDetail = (data) => {
    //跳转详情
    navigate(`/detail/${data.article_id}`, { state: { current } }) // id
  }
  const toUser = (data) => {
    //跳转主页
    navigate(`/user/${data.media_id}`) // id
  }

  return (
    <BtmArticlescontainer>
      <div className="btm_bar"></div>
      <div className="btmLine">
        <span className="title">文章推荐</span>
      </div>
      <div className="btm_aritles">
        {newArr.map((item) => (
          <Card
            key={item.article_id}
            // style={{ width: 180 }}
            cover={
              <div className="btm_aritles_top">
                <img
                  className="btm_aritles_img"
                  onClick={() => toDetail(item)}
                  alt={item.title}
                  src={item.image_url}
                />
                <h4 className="btm_aritles_title">{item.title}</h4>
              </div>
            }
          >
            <div className="media_user" onClick={() => toUser(item)}>
              <Avatar className='media_avatar' src={item.media_user.avatar_url} />
              <div className="mediaDetail">
                <h4 className="mediaName">{item.media_user.media_name}</h4>
                <p className="description">{item.media_user.media_info}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </BtmArticlescontainer>
  )
}

export default BtmArticles
