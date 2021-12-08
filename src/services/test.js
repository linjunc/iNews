import instance from '../utils/request'

export const getData = (options) => {
  return instance({
    url: '/test',
    method: 'GET',
    params: options,
  })
}
