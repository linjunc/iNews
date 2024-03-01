import instance from '../utils/request'

export const getSearchData = (options) => {
  return instance({
    url: '/search',
    method: 'GET',
    params: options,
  })
}
