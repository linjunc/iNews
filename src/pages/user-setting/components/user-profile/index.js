import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  memo,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { getSession, setSession } from '../../../../utils/storage'
import { uploadAvatar, uploadUserInfo } from '../../../../services/user'
import { userInfoContext } from '../../../../models/context'

import { Button, message } from 'antd'
import AvatarInput from './components/avatar-input'
import FormInput from './components/form-input'

import { UserProfileWrapper } from './style'

export default memo(function UserProfile() {
  // 用于存储头像所对应的formData对象
  const [formData, setFormData] = useState(null)
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const navigate = useNavigate()
  const { userInfo, setStateFn: setUserInfo } = useContext(userInfoContext)
  // 获取头像、个人介绍、用户名，并存储到本地
  const { avatar, introduction, nickname, personal_page } = userInfo

  // 用户名要和简介被修改后修改本地存储的数据
  useEffect(() => {
    setSession('username', nickname)
    setSession('introduction', introduction)
  }, [nickname, introduction])

  // 用于子组件传递给父组件formData的函数
  const transmitFormData = useCallback(
    (formData) => {
      setFormData(formData)
    },
    [setFormData],
  )

  // token过期之后提示信息并跳转到登录页
  const tokenExceed = () => {
    message.error('登录失效！请重新登录!')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  // 用户点击修改按钮后向后台发送修改请求
  const updateUserInfo = async () => {
    // 如果formData有值则说明用户修改了头像
    if (formData) {
      setIsBtnLoading(true)
      try {
        const avatarRes = await uploadAvatar(formData)
        const { code, msg, userInfo } = avatarRes.data
        if (code === 200) {
          message.success('头像修改成功！')
          setUserInfo &&
            setUserInfo({
              userInfo,
              isLoading: false,
            })
        } else if (code === 401) {
          tokenExceed()
        } else {
          message.error(msg)
        }
      } catch (err) {
        message.error(err)
      }
    }

    // 原始的用户名和个人简介
    const originUserName = nickname
    const originIntroduction = introduction
    // 现在的用户名和个人简介
    const nowNickname = getSession('username')
    const nowIntroduction = getSession('introduction')
    if (!nowNickname) {
      message.error('用户名不能为空！')
    } else if (
      originUserName !== nowNickname ||
      originIntroduction !== nowIntroduction
    ) {
      setIsBtnLoading(true)
      try {
        const userInfoRes = await uploadUserInfo({
          nickname: nowNickname,
          introduction: nowIntroduction,
          personal_page,
        })
        const { code, msg, userInfo } = userInfoRes.data
        if (code === 200) {
          message.success('修改信息成功！')
          setUserInfo({
            userInfo,
            isLoading: false,
          })
        } else if (code === 401) {
          tokenExceed()
        } else {
          message.error(msg)
        }
      } catch (err) {
        message.error(err)
      }
    }
    setIsBtnLoading(false)
  }

  return (
    <UserProfileWrapper>
      <h1 className="main-title">个人资料</h1>
      <div className="middle-item">
        <AvatarInput transmitFormData={transmitFormData} avatar={avatar} />
      </div>
      <form className="items">
        <div className="item middle-item">
          <span className="input-title">用户名</span>
          <FormInput
            value={nickname}
            maxLength={30}
            placeholder="请输入您的用户名"
          />
        </div>
        <div className="item middle-item">
          <span className="input-title">简介</span>
          <FormInput
            value={introduction}
            maxLength={100}
            placeholder="请输入个人简介"
            isIntroduction={true}
          />
        </div>
      </form>
      <div className="btn-wrapper">
        <Button type="primary" loading={isBtnLoading} onClick={updateUserInfo}>
          保存修改
        </Button>
      </div>
    </UserProfileWrapper>
  )
})
