import axios from 'axios'
import instance from '../utils/request'

// 通过 token 来获取用户信息
export const getUserInfo = (options) => {
  return instance({
    url: '/user_info',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: options,
  })
}

// 关注作者
export const FocusAuthor = (options) => {
  return instance({
    url: '/follow_media',
    method: 'PUT',
    data: options,
  })
}

// 更改用户信息
export const setUserInfo = (options) => {
  return instance({
    url: '/set_user_info',
    method: 'PUT',
    data: options,
  })
}

// 更改用户头像
export const uploadAvatar = (options) => {
  return instance({
    url: '/avatar_upload',
    method: 'PUT',
    data: options,
  })
}

// 更改用户信息
export const uploadUserInfo = (options) => {
  return instance({
    url: '/set_user_info',
    method: 'PUT',
    data: options,
  })
}

// 获取用户一年中浏览的时间用于生成日历热图
export const getSpendTimeYearly = (options) => {
  return instance({
    url: '/calendar_hot_graph',
    method: 'GET',
    params: options,
  })
}

// 获取新闻类别阅读时间排名
export const getReadingTimeRank = (options) => {
  return instance({
    url: '/reading_time_rank',
    method: 'GET',
    params: options,
  })
}

// 获取用户关注者列表
export const getFollowersList = (options) => {
  return instance({
    url: '/follower',
    method: 'GET',
    params: options,
  })
}

// 修改是否展示浏览历史记录
export const setShowHistory = (options) => {
  return instance({
    url: '/set_show_history',
    method: 'PUT',
    data: options,
  })
}

// 获取关注的人列表
export const getFollowingList = (options) => {
  return instance({
    url: '/follow_list',
    method: 'GET',
    params: options,
  })
}

// 获取用户关注的标签
export const getTagsList = (options) => {
  return instance({
    url: '/tag_list',
    method: 'GET',
    params: options,
  })
}

// 设置用户关注标签
export const focusTags = (options) => {
  return instance({
    url: '/set_tag_list',
    method: 'PUT',
    data: options,
  })
}

// 获取用户点赞了的新闻列表
export const getLikeList = (options, cancelToken) => {
  return instance({
    url: 'article_list_digg',
    method: 'GET',
    params: options,
    cancelToken,
  })
}

// 获取用户收藏了的文章列表
export const getCollectList = (options, cancelToken) => {
  return instance({
    url: '/article_list_like',
    method: 'GET',
    params: options,
    cancelToken,
  })
}

// 获取浏览新闻历史记录
export const getHistoryList = (options, cancelToken) => {
  return instance({
    url: '/history_list',
    method: 'GET',
    params: options,
    cancelToken,
  })
}

// 获取媒体对应的文章列表
export const getMediaNewsList = (options) => {
  return instance({
    url: 'article_list_user',
    method: 'GET',
    params: options,
  })
}

// 上传头像到图床的函数,不知道为什么使用instance会有跨域问题，直接使用axios就没有
export const upLoadAvatarToBed = (options) => {
  return instance({
    url: '/save_file_oss',
    // 请求类型
    method: 'POST',
    // 设置请求体，在 params 中设置的参数最后都将变为url参数跟在请求行地址的后面
    data: options,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 获取全部标签
export const getAllTags = (options) => {
  return instance({
    url: '/tag_list_all',
    method: 'GET',
    params: options,
  })
}
