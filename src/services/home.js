import instance from '../utils/request'

export const getArticles = (options) => {
  return instance({
    url: '/article_list',
    method: 'GET',
    params: options,
  })
}
