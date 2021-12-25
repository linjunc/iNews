import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Outlet, useLocation, useParams } from 'react-router'
import html2canvas from 'html2canvas'

import {
  getSpendTimeYearly,
  getUserInfo,
  FocusAuthor,
} from '../../services/user'
import { allUserInfoContext } from '../../models/context'
import { getLocal } from '../../utils/storage'

import { message, Skeleton } from 'antd'
import RightContainer from './components/right-container'
import UserInfo from './components/base-info'
import ListHeader from './components/headline'

import {
  UserCenterWrapper,
  LeftContainerWrapper,
  ContentWrapper,
} from './style'

export default function UserCenter() {
  const { id: user_id } = useParams()
  const { pathname } = useLocation()
  // 存储标志变量用于决定还需不需要发请求
  const flag = useRef(true)
  // 从本地获取用户自己的id，用于判断访问的是否为自己的主页
  const { user_id: self_id } = JSON.parse(getLocal('userInfo') || '{}')
  const [isContentShow, setIsContentShow] = useState(true)
  const domRef = useRef()

  // 获取dom操作并赋值给domRef
  const getReportDom = (dom) => {
    domRef.current = dom
  }

  // 管理用户信息和日历热图的数据
  const [contextInfo, setContextInfo] = useState({
    userInfo: {},
    calendarData: [],
    isFollow: false,
    getReportDom,
  })

  const isSelf = self_id === user_id

  // 请求用户信息和日历热图数据，请求完成后取消loading效果
  useEffect(async () => {
    if (flag.current) {
      setIsContentShow(true)
      try {
        const reqArr = [
          getUserInfo({ user_id }),
          getSpendTimeYearly({ user_id }),
        ]
        const resArr = await Promise.all(reqArr)
        const { userInfo, is_follow } = resArr[0].data
        const { data: calendarData } = resArr[1].data
        setContextInfo({
          isFollow: is_follow,
          userInfo,
          calendarData: calendarData
            ? calendarData.map((item) => {
                return {
                  date: new Date(item.date),
                  count: item.count,
                }
              })
            : [],
          getReportDom,
        })
      } catch (err) {
        message.error('数据加载失败，请重试!')
      }
    }
    setIsContentShow(false)
  }, [user_id])

  // 点击关注按钮后发送请求关注/取消用户;注意：依赖一定要写对，否则可能会因为闭包而造成问题
  const concernUserFn = useCallback(() => {
    if (getLocal('token')) {
      setContextInfo({
        ...contextInfo,
        isFollow: !contextInfo.isFollow,
      })
      FocusAuthor({ media_id: user_id })
    } else {
      message.warn('您还没有登录哦！')
    }
  }, [contextInfo, user_id])

  // 判断当前是否需要展示年度图片
  const getIsReport = () => {
    // 根据路径判断用户当前是否处于年度报告页面，如果在，则不显示图片
    const flagStr = pathname.substring(pathname.length - 6)
    return flagStr !== 'report'
  }

  // 点击子组件的按钮后下载年度报告
  const downLoadReport = useCallback(() => {
    const dom = domRef.current
    dom &&
      html2canvas(dom).then(function (canvas) {
        // 返回的canvas对象中有这么一个属性，里面的toDataURL方法可以将canvas转成图片地址
        const imgUrl = canvas.toDataURL('image/png')
        // 生成一个a元素
        const a = document.createElement('a')
        // 生成一个单击事件
        const event = new MouseEvent('click')
        // 将a的download属性设置为我们想要下载的图片名称
        a.download = 'iNews年度报告总结.png'
        // 将生成的URL设置为a.href属性
        a.href = imgUrl
        // 触发a的单击事件
        a.dispatchEvent(event) // 这样点击了之后就会在本地下载链接上对应的了
      })
  }, [domRef.current])

  return (
    <allUserInfoContext.Provider value={contextInfo}>
      <UserCenterWrapper>
        <LeftContainerWrapper>
          <Skeleton
            active
            loading={isContentShow}
            paragraph={{ rows: 4 }}
            round={true}
          >
            {getIsReport() && (
              <>
                <UserInfo isSelf={isSelf} concernUserFn={concernUserFn} />
                <ListHeader
                  isSelf={isSelf}
                  avatar={contextInfo.userInfo.avatar}
                  concernUserFn={concernUserFn}
                  isShowHistory={contextInfo.userInfo.is_show_history}
                  type={contextInfo.userInfo.type}
                />
              </>
            )}
            <ContentWrapper>
              <Outlet />
            </ContentWrapper>
          </Skeleton>
        </LeftContainerWrapper>
        <RightContainer
          isSelf={isSelf}
          userInfo={contextInfo.userInfo}
          downLoadReport={downLoadReport}
        />
      </UserCenterWrapper>
    </allUserInfoContext.Provider>
  )
}
