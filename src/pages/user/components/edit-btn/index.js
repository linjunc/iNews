import React from 'react'
import { Link } from 'react-router-dom'

import { EditBtnWrapper } from './style'

export default function EditBtn(props) {
  return (
    <Link to="/user/setting">
      <EditBtnWrapper style={props.style}>编辑个人信息</EditBtnWrapper>
    </Link>
  )
}
