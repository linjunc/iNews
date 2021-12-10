import React from 'react'
import { Spin } from 'antd'
import { LoadingWrapper } from './style'
// 文章列表下面的加载组件
const Loading = (props) => {
  return (
    <LoadingWrapper>
      <div className="loading">
        <Spin />
      </div>
    </LoadingWrapper>
  )
}
export default Loading
