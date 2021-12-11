import React, { createElement, useState } from 'react'
import { Comment, Tooltip, Avatar } from 'antd'
import moment from 'moment'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'
import { get_comments } from '../../../../services/comment'
const Comments = ({ comment_son }) => {
  // 获取评论列表
  // const data = await get_comments()
  /* 
  评论id comment_id：
  时间戳 create_time
  点赞数 digg_count
  回复数 reply_count
  内容 text
  用户id user_id
  
  */
  let comment_list = comment_son
  const [likes, setLikes] = useState(comment_list?.[0].digg_count)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)
  const like = () => {
    setLikes(comment_list?.[0].digg_count + 1)
    setDislikes(0)
    setAction('liked')
    console.log(moment())
    // console.log(comment_id.comments)
    // console.log(comment_id)
    // console.log(comment_id)
  }

  const dislike = () => {
    setLikes(comment_list?.[0].digg_count)
    setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  return (
    <Comment
      actions={actions}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={<p>{comment_list?.[0].text}</p>}
      datetime={
        <Tooltip
          title={moment(comment_list?.[0].create_time).format(
            'YYYY-MM-DD HH:mm:ss',
          )}
        >
          <span>{moment(comment_list?.[0].create_time).fromNow()}</span>
        </Tooltip>
      }
    />
  )
}

export default Comments
