import React, { useRef, useState } from 'react'

import { Avatar, message } from 'antd'
import noImg from '../../../../../../assets/user-center/default-avatar.png'

import { AvatarInputWrapper } from './style'

export default function AvatarInput(props) {
  const { transmitFormData, avatar } = props
  const inputRef = useRef()
  const [imageUrl, setImageUrl] = useState(
    avatar ||
      require('../../../../../../assets/user-center/default-avatar.png')
        .default,
  )

  // 用户点击头像打开本地文件夹的函数
  const displayFile = () => {
    inputRef.current.click()
  }

  // 根据文件生成formData并传递给父组件的函数
  const createFormData = (file) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('key', '7a90dbbff3b9b99f97e481e6b89dead8')
    // 将formData传递给父组件中
    transmitFormData(formData)
  }

  // 文件框的照片改变了之后会执行的函数
  const uploadAvatar = () => {
    const file = inputRef.current.files[0]
    if (beforeUpload(file)) {
      // 代码执行到这里说明图片格式以及大小满足要求，可以进行预览操作
      getBase64(file)
      createFormData(file)
    }
  }

  // 用户在文件框中选中对应图片后对图片格式以及规模进行判断，看其是否满足条件
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('你只可以上传 JPG/PNG 格式的文件!')
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('图片大小必须要小于5MB!')
    }
    return isJpgOrPng && isLt5M
  }

  // 读取用户选中的本地图片
  const getBase64 = (img) => {
    const reader = new FileReader()
    // 当文件读取完成后将图片更新上去
    reader.addEventListener('load', () => {
      const result = reader.result
      setImageUrl(result)
    })
    reader.readAsDataURL(img)
  }

  return (
    <AvatarInputWrapper>
      <div className="avatar-info">
        <div className="avatar-upload" onClick={displayFile}>
          <div className="upload-input">
            <i className="add-icon">
              <svg className="icon" viewBox="0 0 1024 1024">
                <path
                  d="M464.883436 464.883436V302.244035A23.732788 23.732788 0 0 1 488.616224 279.209271h46.069529a23.732788 23.732788 0 0 1 23.732788 23.034764v162.639401h162.6394a23.732788 23.732788 0 0 1 23.034765 23.732788v46.069529a23.732788 23.732788 0 0 1-23.034765 23.732788H558.418541v162.6394a23.732788 23.732788 0 0 1-23.732788 23.034765H488.616224a23.732788 23.732788 0 0 1-23.732788-23.034765V558.418541H302.244035A23.732788 23.732788 0 0 1 279.209271 534.685753V488.616224a23.732788 23.732788 0 0 1 23.034764-23.732788z m46.767552 465.581458a418.813906 418.813906 0 1 0-418.813906-418.813906 418.813906 418.813906 0 0 0 418.813906 418.813906z m0 92.837083a511.650988 511.650988 0 1 1 511.650989-511.650989 511.650988 511.650988 0 0 1-511.650989 511.650989z"
                  p-id="375018"
                ></path>
              </svg>
            </i>
            <span>点击修改头像</span>
          </div>
          <Avatar
            size={90}
            icon={
              <img
                src={imageUrl}
                alt="头像"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = noImg
                }}
              />
            }
          />
          <input
            type="file"
            className="real-input"
            ref={inputRef}
            onChange={uploadAvatar}
          />
        </div>
        <span className="title">我的头像</span>
      </div>
      <p className="upload-tip">支持 jpg、png、jpeg 格式大小 5M 以内的图片</p>
    </AvatarInputWrapper>
  )
}
