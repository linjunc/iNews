import React, { memo, useState, useEffect } from 'react'

import { setSession } from '../../../../../../utils/storage'

import { Input } from 'antd'

import { FormInputWrapper } from './style'

const { TextArea } = Input
export default memo(function FormInput(props) {
  const { isIntroduction, maxLength, placeholder, value } = props
  const [nowValue, setNowValue] = useState(value)

  // value值改变的时候更新nowValue的值
  useEffect(() => {
    setNowValue(value)
  }, [value])

  // 输入框值改变的时候本地数据的改变
  const valueChange = (value) => {
    if (isIntroduction) {
      setSession('introduction', value)
    } else {
      setSession('username', value)
    }
    setNowValue(value)
  }

  return (
    <FormInputWrapper>
      <TextArea
        value={nowValue}
        showCount={true}
        placeholder={placeholder}
        maxLength={maxLength}
        spellCheck="false"
        className={isIntroduction ? 'introduction' : 'name-input'}
        onChange={(e) => valueChange(e.target.value)}
      />
    </FormInputWrapper>
  )
})
