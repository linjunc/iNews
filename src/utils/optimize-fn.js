import { getScrollTop } from './scrollHeight'

// 节流函数
export const throttleFn = (fn) => {
  let flag = true
  return function () {
    // 注意不要写成箭头函数了，在箭头函数里面是没有arguments的
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, arguments)
      flag = true
    }, 200)
  }
}

// 在个人主页要使用的懒加载函数
// export const lazyload = (graphRef, initChart, lazyFn) => {
//   // 可视区域高度
//   const h = window.innerHeight;
//   //滚动区域高度
//   const s = getScrollTop()
//   //图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
//   if (h + s > graphRef.current.offsetTop) {
//     initChart()
//     window.removeEventListener('scroll', lazyFn) // 执行了initChart函数后就可以取消监听事件了
//   }
// }
