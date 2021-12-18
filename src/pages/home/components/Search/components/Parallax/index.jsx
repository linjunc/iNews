import { throttle } from 'lodash'
import { useContext, useEffect, useRef, useState } from 'react'
import { ParallaxWrapper } from './style'
import { getScrollTop } from '../../../../../../utils/scrollHeight'
import { headerShowContext } from '../../../../../../models/context'

const Parallax = (props) => {
  // 视差部分的引用
  const contentRef = useRef()
  // 视差部分的偏移距离
  const [contentTranslateY, setContentTranslateY] = useState(0)
  // 视差部分是否可见
  const [isVisible, setIsVisible] = useState()
  // 头部是否可见
  const setHeaderShow = useContext(headerShowContext)

  useEffect(() => {
    // 判断视差部分是否进入视窗 的observer
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsVisible(e.isIntersecting)
        setHeaderShow(!e.isIntersecting)
      },
      { threshold: 0 },
    )
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [contentRef, setHeaderShow])

  // 可见就添加监听器
  useEffect(() => {
    // scroll listener，随着滚动距离设置偏移量
    const handleScroll = throttle(() => {
      setContentTranslateY(
        getScrollTop() / contentRef.current.getBoundingClientRect().height,
      )
    }, 16)
    if (isVisible) window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

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
