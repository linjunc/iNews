import instance from '../utils/request'

export const getUserInfo = (options) => {
  return instance({
    url: '/user_info',
  })
}
