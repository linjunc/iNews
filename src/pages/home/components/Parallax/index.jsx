import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ParallaxWrapper } from './style'
import { getScrollTop } from '../../../../utils/scrollHeight'

const Parallax = () => {
  // 视差部分的引用
  const imgRef = useRef()
  // 视差部分的偏移距离
  const [imgTranslateY, setImgTranslateY] = useState(0)
  // 视差部分是否可见
  const [isVisiable, setIsVisiable] = useState()

  // 判断视差部分是否进入视窗 的observer
  const observer = new IntersectionObserver(
    ([e]) => {
      // 原来写的是setIsVisiable(!isVisiable)，但isVisiable只能取到初始化的值
      setIsVisiable(e.isIntersecting)
    },
    { threshold: 0 },
  )
  // observe视差部分
  useEffect(() => {
    observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [imgRef, isVisiable])

  // scroll listener，随着滚动距离设置偏移量
  const handleScroll = throttle(() => {
    setImgTranslateY(
      getScrollTop() / imgRef.current.getBoundingClientRect().height,
    )
  }, 16)
  // 可见就添加监听器
  useEffect(() => {
    isVisiable
      ? window.addEventListener('scroll', handleScroll)
      : window.removeEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisiable])

  return (
    <ParallaxWrapper>
      <img
        ref={imgRef}
        src="https://cn.bing.com/th?id=OHR.GlowWormBMNP_EN-CN7189621327_1920x1080.jpg&rf=LaDigue_1920x1080.jpg"
        alt="test"
        className="parallax-img"
        style={{
          transform: `translateY(${imgTranslateY * 40}%)`,
        }}
      />
    </ParallaxWrapper>
  )
}

export default Parallax
