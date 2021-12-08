import React from 'react'
import { Artilecontainer } from './style'

// const data = {
//   msg: '说明信息',
//   has_more: '是否有更多此类新闻',
//   aritcle_list: [
const data = {
  item_id: '文章id',
  groud_id: '新闻组id 用于获取评论',
  tag: '新闻标签',
  title: '87年湖北夫妻捡弃婴，扛煤气罐供读博士，24年后生父母拿50万认亲',
  abstract: '新闻概要',
  digg_count: '点赞数',
  comment_count: '评论数',
  has_image: '判断是否有图片',
  image_url: '封面图片url 如果没有则为空字符串',
  publish_time: '发布时间戳',
  media_id: '媒体id （作者id）',
  media_user: {
    media_name: '媒体名',
    avatar_url: '媒体头像url',
    follower_count: '媒体关注者数量',
    media_info: '媒体信息',
  },
  image_list: [
    'https://p5.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/b02df2a95d494bd39b4d6b967423994d~tplv-tt-cs0:640:360.jpg',
  ],
}
// ,
//   ],
// }

const Article = () => {
  return (
    <Artilecontainer>
      <div className="left">
        <div className="article-top">
          <h2 className="article-title">{data.title}</h2>
        </div>
        <div className="article-bottom">
          <span className="media_name">{data.media_user.media_name}</span>
          <span className="comment_count">{data.comment_count}评论</span>
          <span className="publish_time">{data.publish_time}</span>
        </div>
      </div>
      <div className="right">
        <img className="article-img" src={data.image_list[0]} alt="" />
      </div>
    </Artilecontainer>
  )
}

export default Article
