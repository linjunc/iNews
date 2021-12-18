// 获取文本中的全部图片

export const getAllImg = (article) => {
  return article.content?.match(/<img.*?>/g).map((url) => {
    return url.match(/\ssrc=['"](.*?)['"]/)[1]
  })
}
