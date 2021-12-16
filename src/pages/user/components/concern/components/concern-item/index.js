import React, { useState } from 'react'

import { Avatar, Button } from 'antd'

import { ConcernItemWrapper } from './style'

export default function ConcernItem() {
  // 需要根据用户的状态从而控制按钮的颜色
  const [isFollow, setIsFollow] = useState(false)

  return (
    <ConcernItemWrapper>
      <div>
        <Avatar
          size={45}
          alt="用户头像"
          src="https://p6-passport.byteacctimg.com/img/mosaic-legacy/3791/5070639578~300x300.image"
        />
        <h4 className="title text-nowrap">笑死啦啦</h4>
      </div>
      <Button
        className={
          (isFollow ? 'has-follow' : 'not-follow') + ' btn-style middle-item'
        }
        onClick={(e) => setIsFollow(!isFollow)}
      >
        {isFollow ? '已关注' : '关注'}
      </Button>
    </ConcernItemWrapper>
  )
}
