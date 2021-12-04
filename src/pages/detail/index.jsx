// 文章详情
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import dayjs from "dayjs";
import { getArticleDetail } from '../../services/detail'

import LoveButton from '../../components/LoveButton'

import {
    DetailWrapper
} from './style'


// 采用 memo 对子组件重新渲染造成的影响进行控制

const Detail = memo(() => {
    const { id } = useParams()
    const [loveDone, setLoveDone] = useState(false)
    const [collect, setCollect] = useState(false)
    const [article, setArticle] = useState('')
    const [numGroup, setNumGroup] = useState({
        loveNum: 0,
        commentNum: 0,
        collectNum: 0
    })
    // let numberGroup = useMemo(() => {
    //     return {
    //         loveNum: 0,
    //         commentNum: 0,
    //         collectNum: 333
    //     }
    // }, [])
    useEffect(() => {
        const getArticle = async () => {
            console.log('调用');
            const res = await getArticleDetail({ item_id: "7037433142361195039" })
            const { article } = res.data
            // 存储文章点赞数据
            // numberGroup.commentNum = article.comment_count
            setNumGroup({
                loveNum: 1,
                commentNum: article.comment_count,
                collectNum: article.digg_count
            })
            // 处理时间
            article.publish_time = dayjs(parseInt(article.publish_time + '000')).format('YYYY-MM-DD HH:mm')
            setArticle(article)
        }
        getArticle()
    }, [])


    const handleLove = () => {
        setNumGroup({ ...numGroup, loveNum: ++numGroup.loveNum })
        console.log(numGroup.loveNum);
        setLoveDone(true)
    }
    const handleCollect = () => {
        setNumGroup({ ...numGroup, collectNum: ++numGroup.collectNum })
        setCollect(true)
    }
    return (
        <DetailWrapper>
            <div className="left-sidebar">
                <div className='left-box'>
                    <div className='left-clear'></div>
                    <div className='left-container'>
                        <LoveButton handleClick={handleLove} done={loveDone} key="love" type={0} number={numGroup.loveNum} />
                        <LoveButton handleClick={handleLove} key="comment" type={1} number={numGroup.commentNum} />
                        <LoveButton handleClick={handleCollect} done={collect} key="collect" type={2} number={numGroup.collectNum} />
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="article-container">
                    <h1 dangerouslySetInnerHTML={{ __html: article.title }} />
                    <div className="article-meta">
                        <div className="article-type">原创</div>
                        <div className="article-time">{article.publish_time}</div>
                        <div className="article-author">{article?.media_user?.media_name} </div>
                    </div>
                    <article dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>
            <div className="right-sidebar">dfs</div>
        </DetailWrapper>
    );
})

export default Detail;