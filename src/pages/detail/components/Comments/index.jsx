import React, { createElement, useState, useEffect, useCallback } from 'react'
import { Comment, Tooltip, Form, Button, List, Input, message } from 'antd'
import moment from 'moment'
import { LikeOutlined, LikeFilled, DownOutlined } from '@ant-design/icons'
import {
  get_comments,
  post_comments,
  put_comments_digg,
  post_comments_reply,
  get_comments_reply,
} from '../../../../services/comment'
import { CommentReply } from './style'
import 'moment/locale/zh-cn'
const { TextArea } = Input
const Comments = ({ id }) => {
  const [hasToken, setHasToken] = useState(false)
  const [likes, setLikes] = useState([])
  const [action, setAction] = useState([])
  const [data, setData] = useState([])
  const [commentId, setCommentID] = useState([])
  const [replyNum, setReplyNum] = useState([])
  //是否提交
  const [submitting, setSubmit] = useState(false)
  //设置提交值
  const [value, setValue] = useState('')
  // 评论区数据
  const [comment_list, setComments] = useState([])
  const [commentLoding, setLoding] = useState(true)
  // 评论跳过条数
  const [commentSkip, setCommentkip] = useState(0)
  //是否有更多评论
  const [isMoreCom, setMoreCon] = useState(false)
  //评论总数
  const [comAll, setComAll] = useState(0)
  //渲染得到评论

  useEffect(() => {
    const getCommentlist = async () => {
      const localToken = JSON.parse(localStorage.getItem('token')) ?? null
      setHasToken(localToken)
      const res_comment = await get_comments({
        article_id: id,
        n: 5,
        skip: commentSkip,
      })
      // 评论区状态判断
      setMoreCon(res_comment.data.has_more)
      if (res_comment.data.code === 204) {
        setLoding(false)
        return
      }
      setComAll(res_comment.data.comment_count)
      if (commentSkip > 0) {
        let tem_ = [...res_comment.data.comment_list]
        setComments(tem_)
        return
      }
      let tem = res_comment.data.comment_list
      //存储评论
      comment_list.push(tem)
      setComments(tem)
    }
    getCommentlist()
  }, [commentSkip])
  //初次渲染评论
  useEffect(() => {
    let data_tem = data
    if (comment_list) {
      setLikes([])
      setAction([])
      setData([])
      setCommentID([])
      setReplyNum([])
      for (let i = 0; i < comment_list['length']; i++) {
        //设置每一个动作为0
        likes.push(comment_list?.[i].digg_count)
        action.push(comment_list?.[i].is_digg)
        commentId.push(comment_list?.[i].comment_id)
        replyNum.push(comment_list?.[i].reply_count)
        let tem = {
          actions: [
            //自定义评论组件
            <Pinglun a={i} pinlun={comment_list?.[i].reply_count}></Pinglun>,
          ],
          author: comment_list?.[i].user_info.user_name,
          avatar: comment_list?.[i].user_info.avatar_url,
          content: <p>{comment_list?.[i].text}</p>,
          datetime: (
            <Tooltip
              title={moment(
                parseInt(comment_list?.[i].create_time + '000'),
              ).format('YYYY-MM-DD HH:mm:ss')}
            >
              <span>
                {moment(
                  parseInt(comment_list?.[i].create_time + '000'),
                ).fromNow()}
              </span>
            </Tooltip>
          ),
        }
        data_tem.push(tem)
      }
    }
    setLikes([...likes])
    setAction([...action])
    setData([...data_tem])
    setCommentID([...commentId])
    setReplyNum([...replyNum])
  }, [comment_list])

  //点赞按钮
  async function like(a) {
    if (!hasToken) {
      message.info('请先登录')
      return
    }
    //获取到标签下标
    const index = a.getAttribute('index')
    //如果点赞了，就加1，如果没有的话，就减-1
    likes[index] = action[index] ? --likes[index] : ++likes[index]
    action[index] = !action[index]
    //评论区对应的id
    let options = {
      comment_id: commentId[index],
    }
    await put_comments_digg(options)
    setLikes([...likes])
    setAction([...action])
  }
  //提交处理
  async function onSubmit() {
    if (!hasToken) {
      message.info('请先登录')
      return
    }
    if (value === '') {
      setLoding(false)
      message.info('评论内容不能为空')
      return
    }
    setComAll(comAll + 1)
    likes.push(0)
    replyNum.push(0)
    setLikes((likes) => [...likes, 0])
    setReplyNum((replyNum) => [...replyNum, 0])
    setAction([...action, false])
    setLoding(true)

    let index = data.length
    let options = {
      text: value,
      article_id: id,
    }
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) //进行json解析
    const result = await post_comments(options)
    setValue('')
    commentId.push(result.data.comment_id)
    setCommentID([...commentId])
    setSubmit(!submitting)
    let tem = {
      actions: [<Pinglun a={index}></Pinglun>],
      author: userInfo?.nickname,
      avatar: userInfo?.avatar,
      content: <p>{value}</p>,
      datetime: (
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      ),
    }
    setData([tem, ...data])
  }

  //点赞的组件
  //接收父通信
  function Dianzan({ callback, id }) {
    useEffect(() => {
      setLoding(false)
    }, [callback])
    return (
      <>
        <Button
          type="text"
          icon={createElement(
            action[id.a + commentSkip] === true ? LikeFilled : LikeOutlined,
          )}
        />
        <span className="comment-action">{likes[id.a]}</span>
      </>
    )
  }
  //评论内容
  function Pinglun(a, pinlun) {
    const [val, setVal] = useState('')
    //显示回复框
    const [isReply, setIsreply] = useState(false)
    const [count, setCount] = useState(1)
    //显示回复评论内容
    const [isReplyCon, setIsreplyCon] = useState(false)
    //回复后显示第一条
    const [isShift, setIsShift] = useState(false)
    //回复后需要返回多少条
    const [ShiftNum, setShiftNum] = useState(0)
    //评论回复列表
    const [replyList, setReplyList] = useState([])
    //获取评论数的跳过的内容
    const [replySkip, setReplySkip] = useState(0)
    const [isMoreReply, setIsMoreReply] = useState(true)
    const callback = useCallback(() => {
      return count
    })
    //回复区进行渲染
    function getReplyCom() {
      if (!hasToken) {
        message.info('请先登录')
        return
      }
      const getReplyList = async () => {
        const res_reply = await get_comments_reply({
          comment_id: commentId[a.a + commentSkip],
          n: 5,
          skip: replySkip,
        })
        //评论回复列表
        let replyListContent = res_reply.data.reply_list
        setIsMoreReply(res_reply.data.has_more)
        if (replyListContent !== undefined) {
          for (let i = 0; i < replyListContent['length']; i++) {
            let tem = {
              //如果需要对评论回复进行回复和点赞等功能，可以在这里进行添加
              actions: [],
              author: replyListContent[i].user_info?.nickname,
              avatar: replyListContent[i].user_info?.avatar_url,
              content: <p>{replyListContent[i].text}</p>,
              datetime: (
                <Tooltip
                  title={moment(
                    parseInt(replyListContent[i].create_time + '000'),
                  ).format('YYYY-MM-DD HH:mm:ss')}
                >
                  <span>
                    {moment(
                      parseInt(replyListContent[i].create_time + '000'),
                    ).fromNow()}
                  </span>
                </Tooltip>
              ),
            }
            replyList.push(tem)
          }
          //删除最后一个元素
          let time = ShiftNum

          while (isShift && !res_reply.data.has_more && time) {
            replyList.pop()
            time -= 1
          }

          setReplyList([...replyList])
          setIsreplyCon(true)
        }
      }
      getReplyList()
      setReplySkip(replySkip + 5)
    }

    //点击回复评论
    async function commentReply() {
      // console.log(val)
      if (!hasToken) {
        message.info('请先登录')
        return
      }
      if (val === '') {
        message.info('回复内容不能为空')
        return
      }
      if (val !== '') {
        let userInfo = JSON.parse(localStorage.getItem('userInfo')) //进行json解析
        // console.log(userInfo)
        let id = commentId[a.a + commentSkip]
        replyNum[a.a + commentSkip] += 1
        // console.log(val)
        await post_comments_reply({ text: val, comment_id: id })
        let tem = {
          actions: [],
          author: userInfo.nickname,
          avatar: userInfo.avatar,
          content: <p>{val}</p>,
          datetime: (
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          ),
        }
        replyList.unshift(tem)
        setReplyList([...replyList])
        setIsreplyCon(false)
        setIsShift(true)
        setShiftNum(ShiftNum + 1)
      }
      setVal('')
      setIsreply(false)
    }

    return (
      <div>
        <span
          onClick={(e) => {
            setCount(count + 1)
            like(e.currentTarget)
          }}
          index={a.a + commentSkip}
        >
          <Dianzan id={a} onclike={1} callback={callback} />
        </span>
        <Button
          type="text"
          key="comment-list-reply-to-0"
          onClick={(e) => {
            setIsreply(!isReply)
          }}
        >
          回复
        </Button>

        <CommentReply style={isReply ? {} : { display: 'none' }}>
          <Form.Item className="reply">
            <TextArea
              rows={4}
              value={val}
              onChange={(event) => setVal(event.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" onClick={commentReply} type="primary">
              评论
            </Button>
          </Form.Item>
        </CommentReply>

        {/* 子评论区 */}
        {(isReplyCon || isShift) && Boolean(replyList.length) && (
          <List
            // loading={isReplyLoading}
            className="comment-list"
            itemLayout="horizontal"
            dataSource={replyList}
            style={{ textAlign: 'left' }}
            renderItem={(item) => (
              <li>
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
        )}

        <span style={replyNum[a.a + commentSkip] ? {} : { display: 'none' }}>
          <a
            className="ant-dropdown-link"
            style={isReplyCon || !isMoreReply ? { display: 'none' } : {}}
            onClick={(e) => {
              getReplyCom()
            }}
          >
            {replyNum[a.a + commentSkip]}条回复 <DownOutlined />
          </a>
          <a
            className="ant-dropdown-link"
            style={!isReplyCon || !isMoreReply ? { display: 'none' } : {}}
            onClick={(e) => {
              getReplyCom()
            }}
          >
            显示更多回复 <DownOutlined />
          </a>
        </span>
      </div>
    )
  }

  return (
    <>
      <>
        <Form.Item>
          <TextArea
            rows={4}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={onSubmit} type="primary">
            评论
          </Button>
        </Form.Item>
      </>

      <List
        loading={commentLoding}
        className="comment-list"
        style={{ textAlign: 'left' }}
        header={`共有${comAll}条评论`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            ></Comment>
          </li>
        )}
      />
      <Button
        onClick={() => {
          setCommentkip(commentSkip + 5)
          setLoding(true)
        }}
        style={data.length && isMoreCom ? {} : { display: 'none' }}
        block
      >
        点击加载更多！
      </Button>
    </>
  )
}

export default Comments
