import { getScrollTop } from './scrollHeight'

// 滑动到浏览器底部的时候执行操作
export const lazyLoad = (executeFn, dom, distance) => {
  const targetDom = dom || document.body
  return () => {
    // 可视区域高度
    const h = window.innerHeight
    //滚动区域高度
    const s = getScrollTop()
    //图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
    if (h + s >= targetDom.scrollHeight - (distance || 200)) {
      executeFn()
    }
  }
}
