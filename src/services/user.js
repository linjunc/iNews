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
