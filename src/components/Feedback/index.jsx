import React, { useRef, useState } from 'react'
import { message, Modal, Form, Input, Spin } from 'antd'
import LoveButton from '../LoveButton'
import { userFeedBack } from '../../services/bitable'

const Feedback = ({done}) => {

    const modelRef = useRef(null)

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (values) => {
       message.loading('正在提交', 1)
        try {
            console.log('Received values of form: ', values)

            const data = await userFeedBack(values)

            if (data.data.code !== 200) {
                message.error(`提交失败： ${data.data.msg}`)
                return
            }
            message.success('提交成功')
            modelRef.current.destroy()
        } catch (err) {
            console.log(err)
            message.error('提交失败')
        } finally {
         
        }
        
    }

    const handleClick = () => {
        modelRef.current = Modal.confirm({
            
            title: '意见反馈',
            width: 600,
            okText: "确认提交",
            cancelText: "取消提交",
            onCancel: () => {
                console.log('!!!')
            },
            onOk: (close) => {
                form
                    .validateFields()
                    .then(async (values) => {
                        await handleSubmit(values);
                        form.resetFields();
                    })
                    .catch((info) => {
                        console.log('校验失败:', info);
                        return Promise.reject()
                    });
            },
            content: <div>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    style={{
                        maxWidth: 600,
                    }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="请描述您遇到的问题"
                        name="feedback_question"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="请描述您遇到的问题" maxLength={6} />
                    </Form.Item>

                    <Form.Item
                        label="请输入希望改进的地方"
                        name="advance"
                    >
                        <Input.TextArea rows={4} placeholder="请输入希望改进的地方" maxLength={6} />
                    </Form.Item>
                    <Form.Item
                        label="留下您的联系方式，方便我们与您联系"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>,
        })
    }

    return (
        <LoveButton
            done={done}
            handleClick={handleClick}
            key="after"
            content="意见反馈"
            type={8}
        />
    )
}

export default Feedback
