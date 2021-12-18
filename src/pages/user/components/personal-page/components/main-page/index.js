import React, { useRef, useEffect, useState, useContext } from 'react'
import { marked } from 'marked'
import { CSSTransition } from 'react-transition-group'
import xss from 'xss'

import { setUserInfo } from '../../../../../../services/user'
import { getSession, setSession } from '../../../../../../utils/storage'
import { userInfoContext } from '../../../../../../models/context'

import { Button, Input, message } from 'antd'

import { MarkedContentWrapper, MarkedAreaWrapper } from './style'

const { TextArea } = Input
// 配置过滤xss攻击的白名单
const myXss = new xss.FilterXSS({
  whiteList: {
    div: ['align', 'title', 'style'],
    p: ['align', 'style'],
    span: ['align', 'style'],
    img: ['align', 'alt', 'src', 'target', 'title', 'style'],
    h1: ['align', 'style'],
    h2: ['align', 'style'],
    h3: ['align', 'style'],
    h4: ['align', 'style'],
    h5: ['align', 'style'],
    h6: ['align', 'style'],
  },
})
export default function MainPage() {
  // 用于记录预览框的dom元素
  const markedRef = useRef()
  // 从context中获取用户信息
  const userAllInfo = useContext(userInfoContext)
  let { personal_page, nickname, introduction } = userAllInfo
  // 记录上一此更改个人主页的代码
  let lastPersonalPage = useRef(personal_page)
  // 用于表示是否展示编辑框的状态
  const [isShowEditBox, setIsShowEditBox] = useState(false)
  // 控制按钮是否处于加载的状态
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  // 对marked实例进行一些配置
  const rendererMD = new marked.Renderer()
  marked.setOptions({
    renderer: rendererMD,
    gfm: true, // 允许 Git Hub标准的markdown.
    tables: true, // 允许支持表格语法。该选项要求 gfm 为true
    breaks: true, // 允许回车换行
    pedantic: false, // 不纠正原始模型任何的不良行为和错误
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
    smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
  }) //基本设置

  // 当personal_page的值更改时更新上一次存储的代码值
  useEffect(() => {
    lastPersonalPage.current = personal_page
  }, [personal_page])

  // 组件第一次挂载到页面上时在本地存取个人信息
  useEffect(() => {
    setSession('personal_page', personal_page)
  }, [personal_page])

  useEffect(() => {
    if (!isShowEditBox && personal_page) {
      // 在将用户输入的内容渲染到页面之前先做一次xss攻击过滤
      const html = myXss.process(getSession('personal_page') || personal_page)
      markedRef.current.innerHTML = marked(html)
    }
  }, [isShowEditBox, personal_page])

  // 用户点击预览按钮之后要像后台发送请求保存更改的个人主页数据
  const previewMainPage = async () => {
    const value = getSession('personal_page')
    if (lastPersonalPage.current !== value) {
      setIsBtnLoading(true)
      lastPersonalPage.current = value
      try {
        const res = await setUserInfo({
          nickname,
          introduction,
          personal_page: value,
        })
        const { msg, code } = res.data
        if (code === 200) {
          personal_page = res.data.userInfo.personal_page
        } else {
          message.error(msg)
        }
      } catch (err) {
        message.error(err)
      } finally {
        setIsBtnLoading(false)
      }
    }
    setIsShowEditBox(false)
  }

  return (
    <MarkedAreaWrapper>
      {personal_page && (
        <div className="title middle-item">
          {!isShowEditBox ? (
            <div
              className="edit middle-item"
              title="编辑个人主页"
              onClick={(e) => setIsShowEditBox(true)}
            >
              <svg height="16" width="16">
                <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
              </svg>
            </div>
          ) : (
            <Button
              className="preview-btn"
              loading={isBtnLoading}
              icon={
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
              }
              title="保存并预览"
              onClick={previewMainPage}
            >
              Preview
            </Button>
          )}
        </div>
      )}
      {isShowEditBox ? (
        <TextArea
          spellCheck="false" // 不让其检查拼写问题
          defaultValue={getSession('personal_page') || personal_page}
          onChange={(e) => setSession('personal_page', e.target.value)}
        />
      ) : (
        <CSSTransition in={true} timeout={1500} appear classNames="marked">
          <MarkedContentWrapper ref={markedRef} />
        </CSSTransition>
      )}
    </MarkedAreaWrapper>
  )
}
