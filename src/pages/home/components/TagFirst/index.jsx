import React, { useState, useEffect, useRef, useContext } from 'react'
import { message, Modal } from 'antd'
import { TagWrapper } from './style'
import TagItem from './TagItem'
import { focusTags } from '../../../../services/user'
import { userContext } from '../../../../models/context'
import { EDIT_INFO } from '../../../../models/constant'
import { setLocal } from '../../../../utils/storage'

const TagFirst = ({ userTag }) => {
  const oneRef = useRef(true)
  const [nowData, setNowData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const { userInfo, userDispatch } = useContext(userContext)
  const allTagList = [
    {
      name: '社会',
      tag: 'news_society',
    },
    {
      name: '娱乐',
      tag: 'news_entertainment',
    },
    {
      name: '科技',
      tag: 'news_tech',
    },
    {
      name: '军事',
      tag: 'news_military',
    },
    {
      name: '体育',
      tag: 'news_sports',
    },
    {
      name: '汽车',
      tag: 'news_car',
    },
    {
      name: '财经',
      tag: 'news_finance',
    },
    {
      name: '国际',
      tag: 'news_world',
    },
    {
      name: '时尚',
      tag: 'news_fashion',
    },
    {
      name: '旅游',
      tag: 'news_travel',
    },
    {
      name: '历史',
      tag: 'news_history',
    },
    {
      name: '政法',
      tag: 'news_legal',
    },
    {
      name: '政治',
      tag: 'news_politics',
    },
    {
      name: '航空',
      tag: 'news_air',
    },
  ]
  // 如果是第一次打开并且没有关注标签
  useEffect(() => {
    if (!userTag?.length && oneRef.current && !!userInfo) {
      setIsVisible(true)
      oneRef.current = false
    }
  }, [])
  const handleOk = async () => {
    setIsVisible(false)
    if (nowData.length !== 0) {
      try {
        const { data } = await focusTags({ tag_list: nowData })
        if (data.code === 200) {
          message.success(data.msg)
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ ...userInfo, userTag: nowData }),
          )
          userDispatch({
            type: EDIT_INFO,
            userInfo: { ...userInfo, userTag: nowData },
          })
        } else {
          message.error(data.msg)
        }
      } catch (error) {
        message.error('请求错误')
      }
    }
  }
  return (
    <Modal
      title="请选择你感兴趣的标签"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleOk}
      width={1200}
      style={{ top: 60 }}
    >
      {' '}
      <TagWrapper>
        {allTagList.map((item) => (
          <TagItem
            nowData={nowData}
            setNowData={setNowData}
            key={item.tag}
            tagInfo={item}
          />
        ))}
      </TagWrapper>
    </Modal>
  )
}

export default TagFirst
