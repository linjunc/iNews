import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`} //标题
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />} //各个属性
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        评论
      </Button>
    </Form.Item>
  </>
)
//回复区
class Comment_reply extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return
    }

    this.setState({
      submitting: true,
    })

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{this.state.value}</p>,
            datetime: dayjs().fromNow(),
          },
        ],
      })
    }, 1000)
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { comments, submitting, value } = this.state

    return (
      <>
        <Comment
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        {comments.length > 0 && <CommentList comments={comments} />}
      </>
    )
  }
}
export default Comment_reply
