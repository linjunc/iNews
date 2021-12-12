import instance from '../utils/request'
//根据文章id获取文章评论
export const get_comments = (options) => {
  // 根据用户的user_id、n（获取几项）、skip（跳过几项）
  return instance({
    url: '/comment_list',
    method: 'Get',
    params: options,
  })
}

//根据用户id获取用户的评论数
export const get_comments_user = (options) => {
  // 根据用户的user_id、n（获取几项）、skip（跳过几项）
  return instance({
    url: '/comment_list_user',
    method: 'Get',
    params: options,
  })
}

//发送文章的评论
export const post_comments = (options) => {
  // 根据用户的text、article_id  发送评论，文章的id
  return instance({
    url: '/comment',
    method: 'post',
    params: options,
  })
}

//根据评论id，发送回复平路
export const post_comments_reply = (options) => {
  // 根据用户的text、comment_id  发送评论，评论的id
  return instance({
    url: '/reply',
    method: 'post',
    params: options,
  })
}

//根据评论id，点赞、取消点赞评论
//put请求
export const put_comments_digg = (options) => {
  // 根据用户的text、comment_id  发送评论，评论的id
  return instance({
    url: '/comment_digg',
    method: 'put',
    params: options,
  })
}

//删除评论
//根据评论id删除评论
export const DELETE_comments_delete = (options) => {
  // 根据用户的text、comment_id  发送评论，评论的id
  return instance({
    url: '/comment_delete',
    method: 'DELETE',
    params: options,
  })
}

//删除回复
export const DELETE_reply_delete = (options) => {
  // 根据用户的text、reply_id  发送评论，回复的id
  return instance({
    url: '/reply_delete',
    method: 'DELETE',
    params: options,
  })
}
