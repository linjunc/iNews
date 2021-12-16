import instance from '../utils/request'

// 根据id获取文章详情
export const getArticleDetail = (options) => {
  return instance({
    url: '/article_content',
    method: 'GET',
    params: options,
  })
}

// 获取作者的文章列表
export const getArticleList = (options) => {
  return instance({
    url: '/article_list_user',
    method: 'GET',
    params: options,
  })
}

// 根据标签获取文章

export const getArticleByTag = (options) => {
  return instance({
    url: '/article_list',
    method: 'GET',
    params: options,
  })
}

// 点赞文章，传入文章 id，通过token判断用户

export const digArticle = (options) => {
  return instance({
    url: '/article_digg',
    method: 'PUT',
    data: options,
  })
}

// 收藏文章

export const collectArticle = (options) => {
  return instance({
    url: '/article_like',
    method: 'PUT',
    data: options,
  })
}
