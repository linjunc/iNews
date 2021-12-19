import React, { memo, useState, useContext } from 'react'

import { userInfoContext } from '../../../../models/context'
import { setShowHistory } from '../../../../services/user'

import { UserAccountWrapper } from './style'

export default memo(function UserAccount() {
  const userInfo = useContext(userInfoContext)
  const [isAllowRead, setIsAllowRead] = useState(userInfo.is_show_history)

  // 用户点击切换按钮之后更新其他用户浏览个人主页时的权限
  const changeReadingAuthority = () => {
    setIsAllowRead(!isAllowRead)
    const updateShowHistory = async () => {
      const res = await setShowHistory({ is_show_history: !isAllowRead })
      console.log(res)
    }
    updateShowHistory()
  }

  return (
    <UserAccountWrapper>
      <h1 className="main-title">账号设置</h1>
      <div>
        <div className="items">
          <div className="item middle-item">
            <span className="tip-text">是否允许他人查看自己的阅读记录</span>
            <div className="right-wrapper">
              <span className="operate" onClick={changeReadingAuthority}>
                切换
              </span>
              <span className="state">{isAllowRead ? '允许' : '不允许'}</span>
            </div>
          </div>
          <div className="item middle-item">
            <span className="tip-text">密码</span>
            <div className="right-wrapper">
              <span className="operate">重置</span>
            </div>
          </div>
          <div className="item middle-item">
            <span className="tip-text">账号注销</span>
            <div className="right-wrapper">
              <span className="operate">注销</span>
            </div>
          </div>
        </div>
      </div>
    </UserAccountWrapper>
  )
})
