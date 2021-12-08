import instance from '../utils/request'
// 通过 token 来获取用户信息
export const getUserInfo = (options) => {
  return instance({
    url: '/user_info',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
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
