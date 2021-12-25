import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getLocal, setSession } from '../../../../../../utils/storage'

import { message, Empty } from 'antd'
import { getAllTags, getTagsList } from '../../../../../../services/user'
import { skeletonHandlerHOC } from '../../../../../../utils/high-order-components'
import TagItem from './components/tag-item'

import { ConcernTagsWrapper, TagListWrapper } from './style'

export default function ConcernTags() {
  const { id: user_id } = useParams()
  const { user_id: self_id } = JSON.parse(getLocal('userInfo')) || {}
  const [isLoading, setIsLoading] = useState(true)
  const [tagsList, setTagsList] = useState([])

  const [isAllTagsShow, setIsAllTagsShow] = useState(false)

  const isSelf = self_id === user_id

  // 获取该用户所有的关注者列表
  useEffect(() => {
    const getTags = async () => {
      setIsLoading(true)
      try {
        const getListFn = (id) => {
          return getTagsList({
            user_id: id,
            n: 40,
            skip: 0,
          })
        }
        let reqArr = []
        if (getLocal('token')) {
          reqArr = isSelf
            ? [getListFn(user_id)]
            : [getListFn(user_id), getListFn(self_id)]
        } else {
          reqArr = [getListFn(user_id)]
        }
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
          const { data } = await getAllTags()
          const { tag_list: allTagList } = data || {}
          setTagsList(allTagList)
        }
      } catch (err) {
        message.error('请求失败，请重试！')
      } finally {
        setIsLoading(false)
      }
    }
    getTags()
  }, [isAllTagsShow, isSelf, self_id, user_id])

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
