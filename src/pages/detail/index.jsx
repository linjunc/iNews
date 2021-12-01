// 文章详情
import React from 'react';
import { useParams } from 'react-router';

const Detail = () => {
    const {id} = useParams()
    return (
        <div>
            文章详情页
            {id}
        </div>
    );
};

export default Detail;