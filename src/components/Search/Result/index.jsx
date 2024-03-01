import { Modal } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import './index.css'

export const ResultModal = ({ onClose, data }) => {
    return (
        <>
            <Modal
                title="搜索结果"
                visible={true}
                onCancel={onClose}
                className="result-modal"
                footer={null}
            >
                {
                    (!data.users.length && !data.articles.length) ?
                        <div>
                            <p>暂无搜索结果</p>
                        </div>
                        : null
                }
                {/* <div className="user-result">
                    {data.users.map((user) => {
                        return (
                            <div className="user" key={user.id}>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        )
                    })}
                </div> */}
                <div className="article-result">
                    {data.articles.map((article) => {
                        return (
                            <div className="article-item" key={article.id}>
                                {article.image_url ? (
                                    <div className="article-img">
                                        <img src={article.image_url} alt={article.title} />
                                    </div>
                                ) : null}
                                <div className='article-pic'>
                                    <div className='article-title'>{article.title}</div>
                                    <div className='article-else'>
                                        <div className='article-time'>{dayjs
                                            .unix(article.publish_time)
                                            .format('YYYY-MM-DD HH:mm')}</div>
                                        <div className='article-media'>作者：{article.media_user.media_name}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}
