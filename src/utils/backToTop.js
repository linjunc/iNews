import { useEffect, useState } from 'react'

// 回到顶部动画
export const backToTop = () => {
  let scrollTopTimer = setInterval(function () {
    let top = document.body.scrollTop || document.documentElement.scrollTop
    let speed = top / 30
    document.documentElement.scrollTop -= speed
    if (top === 0) {
      clearInterval(scrollTopTimer)
    }
  }, 5)
}

export const useBackToTop = (isToTop) => {
  const [state, setState] = useState(() => isToTop)
  useEffect(() => {
    let scrollTopTimer = setInterval(function () {
      let top = document.body.scrollTop || document.documentElement.scrollTop
      let speed = top / 30
      document.documentElement.scrollTop -= speed
      if (top === 0) {
        clearInterval(scrollTopTimer)
        setState(false)
      }
    }, 5)
  }, [state])

  return [state, setState]
}
