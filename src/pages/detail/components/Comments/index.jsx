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
} from '../../../../services/comment'
import { Commenttt } from './style'
import ReactDom from 'react-dom'
import Comment_reply from '../Reply'
const { TextArea } = Input
const Comments = ({ id }) => {
  // 获取评论列表
  // const data = await get_comments()
  /* 
  评论id comment_id：
  时间戳 create_time
  点赞数 digg_count
  回复数 reply_count
  内容 text
  用户id user_id
  
  */
  //需要处理一下所有的数据
  //每一个数据都是一个数组
  const [data, setData] = useState([])
  const [likes, setLikes] = useState([])
  const [action, setAction] = useState([])
  const [token, setToken] = useState([])
  //是否提交
  const [submitting, setSubmit] = useState(false)
  //设置提交值
  const [value, setValue] = useState('')
  const [comment_list, setComments] = useState([]) // 评论区数据
  const [isComment, setisComment] = useState(false) // 评论区是否有评论
  //渲染得到评论
  useEffect(() => {
    //获取评论区的数据
    setToken(localStorage.getItem('token'))
    const getCommentlist = async () => {
      const res_comment = await get_comments({
        article_id: id,
        n: 30,
        skip: 0,
      })
      // 评论区状态判断
      if (res_comment.data.code === 204) {
        setisComment(true)
        console.log('暂时没有评论')
        return <>暂时没有评论</>
      } else {
        let tem = res_comment.data.comment_list
        console.log(res_comment.data.comment_list)
        //存储评论
        await setComments([...tem])
        // console.log(comment_list)
        // console.log(id)
        console.log('评论区数据（如果有更新的话）')
        console.log(comment_list)
        console.log(res_comment.data.comment_list)
      }
    }
    getCommentlist()
  }, [submitting])
  //初次渲染评论
  useEffect(() => {
    let data_tem = []
    if (comment_list) {
      // console.log("遍历的数据")
      //得到用户的数据
      //avatar_url 为头像
      //introduction 介绍
      // console.log(comment_list[0].user_info.avatar_url)
      console.log('评论区数据（如果有更新的话）评论数据更新')
      console.log(comment_list)
      setLikes([])
      setAction([])
      for (var i = 0; i < comment_list['length']; i++) {
        //设置每一个动作为0
        likes.push(comment_list?.[i].digg_count)
        action.push(comment_list?.[i].is_digg)
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
          author: comment_list[i].user_info.introduction,
          avatar: comment_list[i].user_info.avatar_url,
          content: <p>{comment_list?.[i].text}</p>,
          datetime: (
            <Tooltip
              title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
            >
              <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
          ),
        }
        data_tem.push(tem)
      }
    }
    // console.log(data_tem)
    setData([...data_tem])
    // console.log("增加")
  }, [comment_list])

  async function like(a) {
    //获取到标签下标
    const index = a.getAttribute('index')
    //如果点赞了，就加1，如果没有的话，就减-1
    likes[index] = action[index] ? --likes[index] : ++likes[index]
    action[index] = !action[index]
    //评论区对应的id
    let comment_id = comment_list[index].comment_id
    let options = {
      comment_id: comment_id,
    }
    const result = await put_comments_digg(options, token)
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
    if (!value) {
      return
    }
    let a = 1
    let index = data.length
    let options = {
      text: value,
      article_id: id,
    }
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) //进行json解析
    const result = await post_comments(options, token)
    setSubmit(!submitting)
    console.log(result)
    console.log('返回结果')
    // console.log("提交评论后的结果")
    // console.log(result)
    // console.log("提交后的likes")
    // console.log("likes")
    // console.log(likes)
    // console.log(index)
    // console.log(likes[index - 1])
    let tem = {
      actions: [
        <Pinglun a={index}></Pinglun>,
        // <span onClick={(e) => {like(e.currentTarget)}} index = {i}>
        //   <Dianzan />
        //   {createElement(action[i] === true ? LikeFilled : LikeOutlined)}
        //   <span className="comment-action">{likes[i]}</span>
        //   <span className="comment-action">{i}</span>
        // </span>,
        // <span key="comment-list-reply-to-0">回复</span>,
      ],
      author: 'Han Solo',
      avatar: userInfo.avatar,
      content: <p>{value}</p>,
      datetime: (
        <Tooltip
          title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
        >
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    }
    setData([...data, tem])
    setValue('')
    //设置点赞数
    // likes.push(0)
    // setAction([...action])
  }

  //点赞的组件
  //接收父通信
  function Dianzan({ callback, id }) {
    const [count, setCount] = useState(() => callback())
    const [ID, setID] = useState()
    useEffect(() => {
      console.log('子组件')
      console.log(callback())
      console.log(id.a)
      console.log(data)
      console.log(likes)
      console.log(likes[id.a])
      setID(id.a)
      setCount(callback())
    }, [callback])
    return (
      <>
        {createElement(action[id.a] === true ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes[id.a]}</span>
      </>
    )
  }
  //评论内容
  function Pinglun(a) {
    const [count, setCount] = useState(1)
    const callback = useCallback(() => {
      return count
    })
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
          <Dianzan id={a} callback={callback} />
        </span>
        <span key="comment-list-reply-to-0"> 回复</span>
        {/* <Commenttt>
              <Form.Item className='reply'>
                <TextArea rows={4}  value={value}  onChange={event => setValue(event.target.value)}/>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit"  onClick={onSubmit} type="primary">
                  评论
                </Button>
              </Form.Item>
            </Commenttt> */}
        {/* <button onClick={(e) => {like(e.currentTarget)} } index={a.a}>+</button> */}
        {/* <input value={val} onChange={event => setVal(event.target.value)}/> */}
      </div>
    )
  }

  // //评论编辑区
  // const Editor = ({ onChange, onSubmit, text_input }) => (
  //   <>
  //     <Form.Item>
  //       <TextArea rows={4}  onChange = {onChange} text_input={text_input} />
  //       {text_input}
  //     </Form.Item>
  //     <Form.Item>
  //       <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
  //       {text_input}
  //         评论
  //       </Button>
  //       {/* <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">

  //       </Button> */}
  //     </Form.Item>
  //   </>
  // );
  // //当输入框改变时输入值
  // const handleChange = e =>{
  //   console.log(e.target.value)
  //   text_input = e.target.value
  // };

  //提交输入框的文本,同时让输入框为0
  // const handleSubmit = () => {
  //   // if(!text_input){
  //   //   return
  //   // }
  //   //提交状态
  //   setSubmit(true)
  //   console.log(text_input)
  //   let index = data.length
  //   likes.push(0)
  //   action.push(false)
  //   // 设置提交的数据
  //   let tem =     {
  //     actions: [
  //       <span onClick={(e) => {like(e.currentTarget)}} index = {index}>
  //         {createElement(action[index] === true ? LikeFilled : LikeOutlined)}
  //         <span className="comment-action">{likes[index]}</span>
  //       </span>,
  //       <span key="comment-list-reply-to-0">回复</span>,
  //     ],
  //     author: 'Han Solo',
  //     avatar: 'https://joeschmoe.io/api/v1/random',
  //     content: (
  //       <p>
  //         {text_input}
  //       </p>
  //     ),
  //     datetime: (
  //       <Tooltip
  //         title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
  //       >
  //         <span>{moment().subtract(1, 'days').fromNow()}</span>
  //       </Tooltip>
  //     ),
  //   }
  //   data.push(tem)
  //   text_input = ''
  //   setSubmit(false)
  // }
  // useEffect(() => {
  //   console.log('这里是评论区')
  //   console.log(comment_list)
  //   var data_tem = []

  //   if (comment_list) {
  //     for (var i = 0; i < comment_list['length']; i++) {
  //       //设置每一个动作为0
  //       action[i] = false
  //       likes[i] = comment_list?.[i].digg_count
  //       for_i[i] = i
  //       //这样子的话
  //       var tem = {
  //         actions: [
  //         <Tooltip key="comment-basic-like" title="Like">
  //           <span onClick={(e) => {like(e.currentTarget)}} index = {i}>
  //             {/* {createElement(action[i] === true ? LikeFilled : LikeOutlined)} */}
  //             <span className="comment-action">{likes[1]}</span>
  //             <span className="comment-action">123123</span>
  //             {/* <Dianzan title={i} like = {likes} action={action}></Dianzan> */}
  //           </span>
  //         </Tooltip>,
  //         <span key="comment-list-reply-to-0">Reply to</span>
  //       ],
  //         author: 'Han Solo',
  //         avatar: 'https://joeschmoe.io/api/v1/random',
  //         content: (
  //           <p>
  //              {comment_list?.[i].text}
  //           </p>
  //         ),
  //         datetime: (
  //           <Tooltip
  //             title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
  //           >
  //             <span>{moment().subtract(1, 'days').fromNow()}</span>
  //           </Tooltip>
  //         ),
  //       }
  //       data_tem.push(tem)
  //       setData([...data_tem])

  //       // console.log(data_tem)
  //     }
  //     console.log(data_tem)
  //     setData([...data_tem])
  //   }
  // }, [])
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
        className="comment-list"
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
            />
          </li>
        )}
      />
    </>
  )
}

export default Comments
