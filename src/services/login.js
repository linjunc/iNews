import instance from '../utils/request'

export const userLogin = (options) => {
  return instance({
    url: '/user_login',
    method: 'POST',
    data: options,
  })
}
