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
