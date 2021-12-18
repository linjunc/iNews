import React, { createElement, useState, useEffect, useCallback } from 'react'
import {
  Comment,
  Tooltip,
  Avatar,
  Form,
  Divider,
  Button,
  List,
  Input,
} from 'antd'
import moment from 'moment'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'
import {
  get_comments,
  post_comments,
  put_comments_digg,
  post_comments_reply,
  get_comments_reply,
} from '../../../../services/comment'
import { Commenttt } from './style'
import ReactDom from 'react-dom'
import Comment_reply from '../Reply'
const { TextArea } = Input
const Comments = ({ id }) => {
  const [data, setData] = useState([])
  const [likes, setLikes] = useState([])
  const [action, setAction] = useState([])
  const [commentId, setCommentID] = useState([])
  //是否提交
  const [submitting, setSubmit] = useState(false)
  //设置提交值
  const [value, setValue] = useState('')
  // 评论区数据
  const [comment_list, setComments] = useState([])
  // 评论区是否有评论
  const [isComment, setisComment] = useState(false)
  const [commentLoding, setLoding] = useState(true)
  //渲染得到评论
  useEffect(() => {
    const getCommentlist = async () => {
      const res_comment = await get_comments({
        article_id: id,
        n: 5,
        skip: 0,
      })
      // 评论区状态判断
      if (res_comment.data.code === 204) {
        setisComment(true)
        console.log('暂时没有评论')
        setLoding(false)
        return <>暂时没有评论</>
      } else {
        let tem = res_comment.data.comment_list
        console.log(id)
        //存储评论
        setComments(tem)
        console.log('评论区数据（如果有更新的话）')
        console.log(comment_list)
        console.log(res_comment.data.comment_list)
      }
    }
    getCommentlist()
  }, [])
  //初次渲染评论
  useEffect(() => {
    let data_tem = []
    if (comment_list.length !== 0) {
      // console.log("遍历的数据")
      //得到用户的数据
      //avatar_url 为头像
      //introduction 介绍
      // console.log(comment_list[0].user_info.avatar_url)

      // console.log('评论区数据（如果有更新的话）评论数据更新')
      // console.log(comment_list)
      setData([])
      setLikes([])
      setAction([])
      setCommentID([])
      console.log('这里是因为commentlist变化才会进行渲染的')
      for (var i = 0; i < comment_list['length']; i++) {
        //设置每一个动作为0
        likes.push(comment_list?.[i].digg_count)
        action.push(comment_list?.[i].is_digg)
        commentId.push(comment_list?.[i].comment_id)
        console.log('time')
        console.log(comment_list?.[i].create_time)
        console.log(moment())
        var tem = {
          actions: [
            <Pinglun a={i}></Pinglun>,
            // <span onClick={(e) => {like(e.currentTarget)}} index = {i}>
            //   <Dianzan />
            //   {createElement(action[i] === true ? LikeFilled : LikeOutlined)}
            //   <span className="comment-action">{likes[i]}</span>
            //   <span className="comment-action">{i}</span>
            // </span>,
            // <span key="comment-list-reply-to-0">回复</span>,
          ],
          author: comment_list[i].user_info.user_name,
          avatar: comment_list[i].user_info.avatar_url,
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
    // console.log(data_tem)
    setData([...data_tem])
    setLikes([...likes])
    setAction([...action])
    setCommentID([...commentId])
    // console.log("增加")
  }, [comment_list])

  async function like(a) {
    //获取到标签下标
    const index = a.getAttribute('index')
    //如果点赞了，就加1，如果没有的话，就减-1
    likes[index] = action[index] ? --likes[index] : ++likes[index]
    action[index] = !action[index]
    //评论区对应的id
    let options = {
      comment_id: commentId[index],
    }
    const result = await put_comments_digg(options)
    // console.log("点赞结果")
    // console.log(result)
    // console.log(comment_list[index].is_digg)
    // console.log(comment_list)
    setLikes([...likes])
    setAction([...action])
    // console.log(action)
    // console.log(likes)
  }
  // const dislike = () => {
  //   setLikes(comment_list?.[0].digg_count)
  //   setDislikes(1)
  //   setAction('disliked')
  // }
  //提交处理
  async function onSubmit() {
    // console.log(value)
    // console.log("value")
    // console.log(likes)
    //设置点赞数
    // setLikes([...likes,0])
    // setAction([...action,false])
    console.log('likespush上面的数据')
    console.log(likes)
    likes.push(0)
    action.push(false)
    setLikes(...likes)
    setAction(...action)
    setLoding(true)
    if (!value) {
      return
    }
    let index = data.length
    let options = {
      text: value,
      article_id: id,
    }
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) //进行json解析
    // console.log("用户数据")
    // console.log(userInfo)
    const result = await post_comments(options)
    setValue('')
    commentId.push(result.data.comment_id)
    setCommentID([...commentId])
    setSubmit(!submitting)
    // console.log(result.data.comment_id)
    // console.log('返回结果')
    // console.log(likes)
    // console.log(action)
    // console.log(data)
    // console.log(commentId)
    // console.log("提交评论后的结果")
    // console.log(result)
    // console.log("提交后的likes")
    // console.log("likes")
    // console.log(likes)
    // console.log(index)
    // console.log(likes[index - 1])
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
    setData([...data, tem])
    // console.log(comment_list)

    // likes.push(result.data.comment_id)

    // likes.push()
    // action.push(false)
    // console.log('data点赞数')
    // console.log(data)
  }

  //点赞的组件
  //接收父通信
  function Dianzan({ callback, id }) {
    const [count, setCount] = useState(() => callback())
    const [ID, setID] = useState()
    useEffect(() => {
      console.log('子组件')
      // console.log(callback())
      // console.log(id.a)
      // console.log(data)
      // console.log(likes)
      // console.log(commentId)
      // console.log(likes[id.a])
      setID(id.a)
      setLoding(false)
      setCount(callback())
    }, [callback])
    return (
      <>
        <Button
          shape="circle"
          icon={createElement(
            action[id.a] === true ? LikeFilled : LikeOutlined,
          )}
        />
        <span className="comment-action">{likes[id.a]}</span>
      </>
    )
  }
  //评论内容
  function Pinglun(a) {
    const [val, setVal] = useState([])
    const [isReply, setIsreply] = useState(false)
    const [isReplyLoading, setIsreplyLoding] = useState(true)
    const [count, setCount] = useState(1)
    //评论回复列表
    const [replyList, setReplyList] = useState([])
    const callback = useCallback(() => {
      return count
    })
    useEffect(() => {
      console.log('回复区进行渲染')
      const getReplyList = async () => {
        // setIsreply(true)
        const res_reply = await get_comments_reply({
          comment_id: commentId[a.a],
          n: 5,
          skip: 0,
        })
        let userInfo = JSON.parse(localStorage.getItem('userInfo')) //进行json解析
        //评论回复列表
        let replyListContent = res_reply.data.reply_list
        // console.log("获取到回复区的内容数据")
        console.log(commentId)
        console.log(res_reply.data)
        if (replyListContent !== undefined) {
          for (let i = 0; i < replyListContent['length']; i++) {
            let tem = {
              actions: [
                // <span onClick={(e) => {like(e.currentTarget)}} index = {i}>
                //   <Dianzan />
                //   {createElement(action[i] === true ? LikeFilled : LikeOutlined)}
                //   <span className="comment-action">{likes[i]}</span>
                //   <span className="comment-action">{i}</span>
                // </span>,
                <span key="comment-list-reply-to-0">回复</span>,
              ],
              author: userInfo?.nickname,
              avatar: userInfo?.avatar,
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
        }
        setReplyList([...replyList])
        setIsreplyLoding(false)
      }
      getReplyList()
    }, [])
    async function commentReply() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo')) //进行json解析
      // console.log(userInfo)
      let id = commentId[a.a]
      const res = await post_comments_reply({ text: val, comment_id: id })
      // console.log("评论回复数据")
      // console.log(res)
      let tem = {
        actions: [
          // <span onClick={(e) => {like(e.currentTarget)}} index = {i}>
          //   <Dianzan />
          //   {createElement(action[i] === true ? LikeFilled : LikeOutlined)}
          //   <span className="comment-action">{likes[i]}</span>
          //   <span className="comment-action">{i}</span>
          // </span>,
          <span key="comment-list-reply-to-0">回复</span>,
        ],
        author: userInfo.nickname,
        avatar: userInfo.avatar,
        content: <p>{val}</p>,
        datetime: (
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        ),
      }
      replyList.push(tem)
      // setReplyList(...replyList)

      // console.log(replyList)
      // setReplyList(res_reply.data.reply_list)
      setVal('')
      setIsreply(false)
    }
    // console.log("评论id")
    // console.log(commentId)
    // console.log("当前对应的个数")
    // console.log(a.a)

    return (
      <div>
        {/* <h4>{count}</h4> */}
        <span
          onClick={(e) => {
            setCount(count + 1)
            like(e.currentTarget)
          }}
          index={a.a}
        >
          <Dianzan id={a} onclike={1} callback={callback} />
        </span>
        <Button
          type="text"
          key="comment-list-reply-to-0"
          onClick={(e) => setIsreply(true)}
        >
          {' '}
          回复
        </Button>
        <Commenttt style={isReply ? {} : { display: 'none' }}>
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
        </Commenttt>
        {replyList.length && (
          <List
            loading={isReplyLoading}
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
        {/* <button onClick={(e) => {like(e.currentTarget)} } index={a.a}>+</button> */}
        {/* <input value={val} onChange={event => setVal(event.target.value)}/> */}
      </div>
    )
  }

  return (
    //这里的话需要加上一个评论区
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
        header={`${data.length} replies`}
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
    </>
  )
}

export default Comments
