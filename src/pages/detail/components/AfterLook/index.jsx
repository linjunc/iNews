import React, { useContext } from 'react';
import { message, Modal } from 'antd';
import LoveButton from '../../../../components/LoveButton';
import { ADD_ARTICLE, DELETE_ARTICLE } from '../../../../models/constant';
import { articleContext } from '../../../../models/context';

const AfterLook = ({  article }) => {
    const { article: articleData, dispatch } = useContext(articleContext)
    const hasItem = articleData.findIndex(item => item.item_id === article.item_id) === -1 ? false : true

    const handleAfter = () => {
        Modal.confirm({
            title: hasItem ? "要从稍后再看中移除吗" : "文章将会被收起到右侧噢，你可以点击浅色区域，查看稍后再看列表噢",
            onOk: () => {
                hasItem ? dispatch({ type: DELETE_ARTICLE, id: article.item_id }) : dispatch({ type: ADD_ARTICLE, article })
                message.success(hasItem ? '移除成功' : '添加成功')
            }
        })
    }

    return (
        <LoveButton
            handleClick={handleAfter}
            done={hasItem}
            key="after"
            content="稍后再看"
            type={7}
        />
    );
};

export default AfterLook;