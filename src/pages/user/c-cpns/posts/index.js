import React, { memo, useRef, useEffect, useState } from 'react'
import { marked } from 'marked'

import { Button, Input } from 'antd'
import CalendarHotGraph from '../calendar'
import { MarkedContentWrapper, MarkedArea } from './style'

const { TextArea } = Input
export default memo(function Posts() {
  // 用于记录预览框的dom元素
  const markedRef = useRef()
  const [isShowEditBox, setIsShowEditBox] = useState(false)

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

  // 将本地取出来的数据转为innerHTML能够解析成标签的
  function escape2Html(str) {
    var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
    return (
      str &&
      str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
        return arrEntities[t]
      })
    )
  }

  useEffect(() => {
    if (!isShowEditBox) {
      markedRef.current.innerHTML = marked(
        escape2Html(localStorage.getItem('mainPageCode')) ||
          '##### Hi,你好！这里可以填写您的个人简介！',
      )
    }
  }, [isShowEditBox])

  return (
    <div>
      <MarkedArea>
        <div className="title middle-item">
          <h1>个人简介</h1>
          {!isShowEditBox ? (
            <div
              className="edit middle-item"
              title="编辑代码"
              onClick={(e) => setIsShowEditBox(true)}
            >
              <svg height="16" width="16">
                <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
              </svg>
            </div>
          ) : (
            <Button
              className="preview-btn"
              icon={
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  class="octicon octicon-eye"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
              }
              title="保存并预览"
              onClick={(e) => setIsShowEditBox(false)}
            >
              Preview
            </Button>
          )}
        </div>
        {isShowEditBox ? (
          <TextArea
            defaultValue={
              escape2Html(localStorage.getItem('mainPageCode')) ||
              '##### Hi,你好！这里可以填写您的个人简介！'
            }
            onChange={(e) =>
              localStorage.setItem('mainPageCode', e.target.value)
            }
          />
        ) : (
          <MarkedContentWrapper ref={markedRef} />
        )}
      </MarkedArea>
      <CalendarHotGraph />
    </div>
  )
})
