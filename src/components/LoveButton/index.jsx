import React, { memo, useRef } from 'react';
import { Button } from 'antd';
import styled, { keyframes } from 'styled-components';
import { HeartFilled, MessageOutlined, StarFilled } from '@ant-design/icons';
// import 'animate.css'
// 注意传递的 done 是布尔类型
const LoveButton = ({ size, done, type, number, handleClick }) => {
    // 通过 props 传入 fontSize 和 color
    const defaultProps = {
        fontSize: size ?? "20px",
        color: done ? '#E7273F' : "#8a93a0",
        type: 0,
        number: null,
    }
    const enumType = [
        <HeartFilled style={{ ...defaultProps }} />,
        <MessageOutlined style={{ ...defaultProps }} />,
        <StarFilled style={{ ...defaultProps }} />
    ]
    return (
        <ButtonBox onClick={handleClick}>
            <LikeBtn type='link'>
                <Container>
                    {
                        enumType[type]
                    }
                </Container>
            </LikeBtn>
            <Num>{number}</Num>
        </ButtonBox>
    );
}

// ButtonBox 
const ButtonBox = styled.div`
    width: 50px;
    height: 70px;
`

// 数量
const Num = styled.div`
    font-size: 12px;
    text-align: center;
`

// 按钮外形
const LikeBtn = styled(Button)`
    width: 50px;
    height: 50px;
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