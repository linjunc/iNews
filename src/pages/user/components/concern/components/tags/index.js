import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  getLocal,
  getSession,
  setSession,
} from '../../../../../../utils/storage'

import { message, Empty } from 'antd'
import { focusTags, getTagsList } from '../../../../../../services/user'
import { skeletonHandlerHOC } from '../../../../../../utils/high-order-components'
import TagItem from './components/tag-item'

import { ConcernTagsWrapper, TagListWrapper } from './style'

export default function ConcernTags() {
  const { id: user_id } = useParams()
  const { user_id: self_id } = JSON.parse(getLocal('userInfo')) || {}
  const [isLoading, setIsLoading] = useState(true)
  const [tagsList, setTagsList] = useState([])
  const [isAllTagsShow, setIsAllTagsShow] = useState(false)

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

  const isSelf = self_id === user_id

  // 获取该用户所有的关注者列表
  useEffect(async () => {
    setIsLoading(true)
    try {
      const getListFn = (id) => {
        return getTagsList({
          user_id: id,
          n: '20',
          skip: '0',
        })
      }
      const reqArr = isSelf
        ? [getListFn(user_id)]
        : [getListFn(user_id), getListFn(self_id)]
      const resArr = await Promise.all(reqArr)
      const { tag_list } = resArr[0].data
      const { tag_list: myTagList } = resArr[1]?.data || {}
      const tagArr =
        (isSelf ? tag_list : myTagList)?.map((item) => item.tag) || []
      // 在本地存储已关注的标签
      setSession('concernTagLists', JSON.stringify(tagArr))
      if (!isAllTagsShow && tag_list) {
        setTagsList(tag_list)
      } else if (tag_list) {
        // 包含了所有标签名字的数组
        const newTagList = allTagList.map((item) => {
          // 与已关注到的标签数组作比较
          if (tagArr.includes(item.tag)) {
            item.is_follow = true
          }
          return item
        })
        setTagsList(newTagList)
      }
    } catch (err) {
      message.error('请求失败，请重试！')
    } finally {
      setIsLoading(false)
    }
  }, [isAllTagsShow])

  return (
    <ConcernTagsWrapper>
      {self_id === user_id && (
        <div className="btn-group">
          <button
            className={'btn-item' + (isAllTagsShow ? '' : ' active')}
            onClick={(e) => setIsAllTagsShow(false)}
          >
            已关注标签
          </button>
          <button
            className={'btn-item' + (isAllTagsShow ? ' active' : '')}
            onClick={(e) => setIsAllTagsShow(true)}
          >
            全部标签
          </button>
        </div>
      )}
      {skeletonHandlerHOC(
        tagsList.length ? (
          <TagListWrapper>
            {tagsList.map((item) => {
              const { name } = item
              return <TagItem key={name} tagInfo={item} />
            })}
          </TagListWrapper>
        ) : (
          <Empty description="暂时还没有关注标签哦！" />
        ),
        { rows: 2 },
        isLoading,
      )}
    </ConcernTagsWrapper>
  )
}
