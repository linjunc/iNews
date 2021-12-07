import styled from "styled-components";

export const FixedContainer = styled.header`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    transition: all .3s;
    border: 1px solid #f1f1f1;
    transform: translate3d(0, -100%, 0);
    background-color: #fff;
    z-index: 300;
`
export const MenuWrapper = styled.div`
    width: 1300px;
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    .layout-logo {
        height: 50px;
        padding: 0px 16px;
        img {
            height: 100%;
            cursor: pointer;
        }
    }
    .layout-nav {
        width: 700px;
        min-width: 530px;
        /* margin: 0 20px; */
        padding-bottom: 0;
        .layout-menu {
            display: flex;
            align-items: flex-end;
            /* background: transparent; */
            border: none;
            font-size: 18px;
        }
    }
    .layout-search-box {
        position: relative;
        width: 330px;
        height: 36px;
        .layout-search {
            height: 100%;
            padding-left: 18px;
            padding-right: 52px;
            font-size: 16px;
            line-height: 20px;
            color: #222;
            border-radius: 5px;
            border: none; 
            background-color: #f5f5f5 !important;
            input {
                background-color: inherit;
            }
        }
        .layout-search-button {
            position: absolute;
            right: 10px;
            height: 36px;
            font-size: 20px;
            color: #1890ff;
            border: none;
            background: none;
            z-index:99;
            cursor: pointer;
        }
    }
    .login-button {
        font-size: 16px;
        font-weight: 500;
        height: 36px;
        border-radius: 8px;
        margin-left: 16px;
    }
    
`