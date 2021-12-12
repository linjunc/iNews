import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { ParallaxWrapper } from './style'
import { getScrollTop } from '../../../../../../utils/scrollHeight'

const Parallax = (props) => {
  // 视差部分的引用
  const contentRef = useRef()
  // 视差部分的偏移距离
  const [contentTranslateY, setContentTranslateY] = useState(0)
  // 视差部分是否可见
  const [isVisiable, setIsVisiable] = useState()

  useEffect(() => {
    // 判断视差部分是否进入视窗 的observer
    const observer = new IntersectionObserver(
      ([e]) => setIsVisiable(e.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [contentRef])

  // scroll listener，随着滚动距离设置偏移量
  const handleScroll = throttle(() => {
    setContentTranslateY(
      getScrollTop() / contentRef.current.getBoundingClientRect().height,
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
      <div
        ref={contentRef}
        className="parallax-content"
        style={{
          transform: `translateY(${contentTranslateY * 40}%)`,
        }}
      >
        {props.children}
      </div>
    </ParallaxWrapper>
  )
}

export default Parallax
