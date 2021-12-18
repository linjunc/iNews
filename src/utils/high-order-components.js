import React from 'react'

import { Skeleton } from 'antd'

// 用于给传进来的函数加入骨架屏的
export const skeletonHandlerHOC = (WrapperComponents, ...args) => {
  // 从args中获取到不同组件应用骨架屏时想要的效果及其对应的对象和函数
  const [paragraph = { rows: 3 }, loading, avatar = false] = args

  return (
    <>
      <Skeleton
        paragraph={paragraph}
        active
        avatar={avatar}
        loading={loading}
        className="Skeleton"
      >
        {WrapperComponents}
      </Skeleton>
      <Skeleton
        paragraph={paragraph}
        active
        avatar={avatar}
        loading={loading}
        className="Skeleton"
      />
      <Skeleton
        paragraph={paragraph}
        active
        avatar={avatar}
        loading={loading}
        className="Skeleton"
      />
    </>
  )
}
