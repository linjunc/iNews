import instance from '../utils/request'

export const userFeedBack = (options) => {
  return instance({
    url: '/user_feedback',
    method: 'POST',
    data: options,
  })
}
