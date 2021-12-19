import React, { memo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getLocal } from '../../../../utils/storage'

import { SettingHeaderWrapper } from './style'

export default memo(function SettingHeader() {
  const { user_id: id } = JSON.parse(getLocal('userInfo') || '{}')
  const navigate = useNavigate()

  useEffect(() => {
    getLocal('token') || navigate('/login')
  }, [])

  return (
    <SettingHeaderWrapper className="middle-item">
      <Link to={`/user/${id}`} className="middle-item">
        <div className="arrow"></div>
        <span>返回个人主页</span>
      </Link>
    </SettingHeaderWrapper>
  )
})
