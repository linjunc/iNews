// 文章项组件
import React, { useEffect } from 'react'
import { BtmArticlescontainer } from './style'
import { Card, Avatar } from 'antd'

import { useNavigate } from 'react-router-dom'

const BtmArticles = ({ newArr }) => {
  const navigate = useNavigate()
  const toDetail = (data) => {
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }
  const toUser = (data) => {
    //跳转主页
    navigate(`/user/${data.media_id}`) // id
  }

  useEffect(() => {}, [])
  return (
    <BtmArticlescontainer>
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
    </BtmArticlescontainer>
  )
}

export default BtmArticles
