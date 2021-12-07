import React from 'react';
import { Button, Popover } from 'antd';
import styled, { keyframes } from 'styled-components';
import {
    HeartFilled,
    MessageOutlined,
    SoundFilled,
    StarFilled,
    CrownFilled,
    CaretUpFilled,
    ShareAltOutlined,
    TagFilled
} from '@ant-design/icons';

// 这个组件封装的太愚蠢了
// 注意传递的 done 是布尔类型
const LoveButton = ({ size, done, type, number, handleClick, content }) => {
    // 通过 props 传入 fontSize 和 color
    const defaultProps = {
        fontSize: size ?? "16px",
        color: done ? '#E7273F' : "#999999",
        type: 0,
        number: null,
    }

    const enumType = [
        <HeartFilled style={{ ...defaultProps }} />,
        <MessageOutlined style={{ ...defaultProps }} />,
        <StarFilled style={{ ...defaultProps }} />,
        <CrownFilled style={{ ...defaultProps }} />,
        <CaretUpFilled style={{ ...defaultProps }} />,
        <ShareAltOutlined style={{ ...defaultProps }} />,
        <SoundFilled style={{ ...defaultProps }} />,
        <TagFilled style={{ ...defaultProps }} />
    ]

    return (
        <ButtonBox onClick={handleClick}>
            <LikeBtn type='link'>
                <Container>
                    <Popover content={content}  >
                        {
                            enumType[type] || enumType[0]
                        }
                    </Popover>

                </Container>
            </LikeBtn>
            <Num>{number}</Num>
        </ButtonBox>
    );
}

// ButtonBox 
const ButtonBox = styled.div`
    width: 40px;
    height: 50px;
    color: #999999;
    transition: all .5s;
    :hover {
        color:#000 !important;
    }
`

// 数量
const Num = styled.div`
    font-size: 12px;
    text-align: center;
    /* color:#999999; */
`

// 按钮外形
const LikeBtn = styled(Button)`
    width: 40px;
    height: 40px;
    background-color: #fff;
    box-shadow: .4rem .4rem .8rem #c8d0e7, -0.4rem -0.4rem .8rem #fff;;
    border-radius: 50%;
    /* position: relative; */
    display: flex;
    justify-content: center;
    align-items: center;  
    cursor: pointer;
    outline: none;
    margin: 10px 0;
`

const pulse = keyframes`
    0% { 
            transform: scale(1);
    }
    10% {
            transform: scale(1.1);
    }
    20% {
            transform: scale(0.9);
    }
    30% {
            transform: scale(1.2);
    }
    40% {
            transform: scale(0.9);
    }
    50% {
            transform: scale(1.1);
    }
    60% {
             transform: scale(0.9);
    }
    70% {
            transform: scale(1);
    }
`

const Container = styled.div`
    :hover {
        animation: ${pulse} 1s linear infinite;
    }
`

export default LoveButton;