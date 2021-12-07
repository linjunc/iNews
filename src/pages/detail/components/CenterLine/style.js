import styled from "styled-components";

export const HotLine = styled.div`
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #222222;
    text-align: center;
    margin: 10px 0;
    span {
        background-color: #f2f2f2;
        padding: 0px 10px;
        user-select: none;
    }
    ::before {
        display: block;
        content: '';
        position: absolute;
        top: 50%;
        z-index: -2;
        width: 100%;
        height: 1px;
        background-color: #d9d9d9;
    }
`