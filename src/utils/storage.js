// 从本地存储中获取数据的函数
export const getLocal = (itemName) => {
  return localStorage.getItem(itemName)
}

// 存取数据到本地的函数
export const setLocal = (itemName, item) => {
  localStorage.setItem(itemName, item)
}

// 从会话存储中获取数据的函数
export const getSession = (itemName) => {
  return sessionStorage.getItem(itemName)
}

// 存取数据到会话数据的函数
export const setSession = (itemName, item) => {
  sessionStorage.setItem(itemName, item)
}

// 将取出来数据中的实体字符转为innerHTML能够解析成的标签形式
// const escapeHtml = str => {
//   const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
//   return (
//     str && str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
//       return arrEntities[t]
//     })
//   )
// }
