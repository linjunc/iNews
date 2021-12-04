import styled from "styled-components";

export const DetailWrapper = styled.main`
    position: relative;
    width: 1000px;
    margin: 40px auto 0;
    padding: 0 18px 0px 18px;
    /* background-color: skyblue; */
    display: flex;
    transition: all .5s;
    div {
        display: inline-block;
        vertical-align: top;
    }
    .left-sidebar {
        float: left;
        margin-left: -58px;
        width: 50px;
        .left-box {
            display: block;
            .left-clear {
                display: block;
                width: 0;
                height: 0;
            }
            .left-container {
                position: fixed;
                top: 160px;
                z-index: 100;
                transform: translateX(-60px);
                div {
                    display: block;
                }
            }
        }
    }
    .main {
        min-width: 657px;
        margin: 0px 50px 0px 60px;
        transition: all .5s;
        .article-meta {
            display: flex;
            align-items: baseline;
            line-height: 16px;
            font-size: 12px;
            color: #707070;
            margin: 20px 0 0px 0px;
            .article-type {
                padding: 3px;
                background-color: #f2f2f2;
                user-select: none;
            }
            div {
                margin: 0 10px;
            }
        }
        .article-container {
            h1 {
                font-size: 30px;
                line-height: 1.5;
                font-weight: bold; 
            }
            p {
                line-height: 1.8;
                font-size: 16px;
                /* text-indent: 2em; */
                margin: 15px 0;
            }
        }
    }
    .right-sidebar {
        min-width: 278px;
        background-color: pink;
    }
`