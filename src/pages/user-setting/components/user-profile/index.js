import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  memo,
} from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getLocal,
  getSession,
  setLocal,
  setSession,
} from '../../../../utils/storage'
import {
  uploadAvatar,
  upLoadAvatarToBed,
  uploadUserInfo,
} from '../../../../services/user'
import { userContext, userInfoContext } from '../../../../models/context'
import { EDIT_INFO } from '../../../../models/constant'

import { Button, message } from 'antd'
import AvatarInput from './components/avatar-input'
import FormInput from './components/form-input'

import { UserProfileWrapper } from './style'

export default memo(function UserProfile() {
  // 用于存储头像所对应的formData对象
  const [formData, setFormData] = useState(null)
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const { userInfo: initUserInfo, userDispatch } = useContext(userContext)
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

  // 用户点击修改按钮后向后台发送修改请求
  const updateUserInfo = () => {
    // 原始的用户名和个人简介
    const originUserName = nickname
    const originIntroduction = introduction
    // 现在的用户名和个人简介
    const nowNickname = getSession('username')
    const nowIntroduction = getSession('introduction')

    // 只要这三个有一个条件满足，就说明用户有改动他的个人信息，需要发送请求
    if (
      formData ||
      originUserName !== nowNickname ||
      originIntroduction !== nowIntroduction
    ) {
      // 更改后的用户名不能为空
      if (nowNickname) {
        setIsBtnLoading(true)
      } else {
        message.warn('用户名不能为空！')
        return
      }

      // 发送请求对应的promise数组
      let reqArr = []
      if (formData) {
        reqArr[0] = upLoadAvatarToBed(formData)
      }
      if (
        originUserName !== nowNickname ||
        originIntroduction !== nowIntroduction
      ) {
        reqArr[1] = uploadUserInfo({
          nickname: nowNickname,
          introduction: nowIntroduction,
          personal_page,
        })
      }

      const upload = async () => {
        try {
          const [avatarData, infoData] = await Promise.all(reqArr)
          console.log(avatarData)
          console.log(infoData)
          let avatar = null
          if (avatarData) {
            const { data } = await uploadAvatar({
              avatar: avatarData.data.data.url,
            })
            avatar = data?.avatar_url
          }
          message.success('个人信息修改成功！')

          // 头像更新之后需要更新存储在本地的用户信息
          const localUserInfo = JSON.parse(getLocal('userInfo'))
          avatarData
            ? (localUserInfo.avatar = avatar)
            : (avatar = localUserInfo.avatar)
          infoData && (localUserInfo.nickname = infoData.data.userInfo.nickname)
          setLocal('userInfo', JSON.stringify(localUserInfo))

          // 更新父组件保存的信息状态以及最顶层的userContext信息
          const newUserInfo = {
            ...userInfo,
            avatar,
            introduction: nowIntroduction,
            nickname: nowNickname,
          }
          setUserInfo &&
            setUserInfo({
              userInfo: newUserInfo,
              isLoading: false,
            })
          userDispatch({
            type: EDIT_INFO,
            userInfo: {
              ...initUserInfo,
              avatar,
              nickname: nowNickname,
            },
          })
        } catch (err) {
          message.error('信息修改错误，请刷新页面重试！')
        } finally {
          setIsBtnLoading(false)
        }
      }
      upload()
    }
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
