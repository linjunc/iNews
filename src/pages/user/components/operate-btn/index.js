import React, { memo, useContext } from 'react'
import { Link } from 'react-router-dom'

import { allUserInfoContext } from '../../../../models/context'

import { EditBtnWrapper, ConcernBtnWrapper } from './style'

export default memo(function OperateBtn(props) {
  const { isSelf, concernUserFn } = props
  const { isFollow } = useContext(allUserInfoContext)

  const styleInfo =
    !isSelf &&
    (() => {
      return isFollow
        ? {
            className: 'has-follow',
            title: '已关注',
          }
        : {
            className: 'not-follow',
            title: '关注',
          }
    })()

  return (
    <>
      {isSelf ? (
        <Link to="/user/setting">
          <EditBtnWrapper style={props.style}> 编辑个人信息</EditBtnWrapper>
        </Link>
      ) : (
        <ConcernBtnWrapper
          className={styleInfo.className}
          style={props.style}
          title={styleInfo.title}
          onClick={concernUserFn}
        >
          {styleInfo.title}
        </ConcernBtnWrapper>
      )}
    </>
  )
})
