import React, { useContext, useState } from 'react';
import { Popover, Drawer, List, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import { articleContext } from '../../models/context';
import { ModalContainer, DrawerBox } from './style'
import { DELETE_ARTICLE } from '../../models/constant';


// 写错了不想改，应该是 Drawer
const AfterModal = () => {
    const navigate = useNavigate()
    const { article: articleData, dispatch } = useContext(articleContext)
    const [visible, setVisible] = useState(false)
    // 侧边栏文章详情跳转
    const getSideDetail = (id) => {
        navigate(`/detail/${id}`)
    }
    const deleteArticle = (id) => {
        dispatch({ type: DELETE_ARTICLE, id })
        message.success('移除成功')
    }
    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <div>
            <Popover placement="left" content="点我试试">
                <ModalContainer onClick={showDrawer} />
            </Popover>
            <Drawer
                title="稍后再看新闻列表"
                onClose={onClose}
                visible={visible}
            >
                <List
                    itemLayout="vertical"
                    dataSource={articleData}
                    renderItem={article => (
                        <DrawerBox>
                            <div key={article?.article_id} className="author-article" onClick={() => getSideDetail(article?.item_id)} >
                                <div className="article-list-img">
                                    <img src={article?.image_url} alt="" />
                                </div>
                                <div className="article-list-right">
                                    <div className="article-list-title">{article?.title}</div>
                                    <div className="article-list-num">
                                        <div className="article-read">{article?.like_count} 阅读</div>
                                        <div className="article-time">{article?.publish_time}</div>
                                    </div>
                                </div>
                            </div>
                            <Button size="small" onClick={(e) => deleteArticle(article?.item_id)}>
                                    移除
                                </Button>
                        </DrawerBox>
                    )}
                />
            </Drawer>
        </div>
    );
};

export default AfterModal; 