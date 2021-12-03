import styled from "styled-components";

export const MenuWrapper = styled.div`
    width: 1300px;
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: skyblue; */
    .layout-logo {
        height: 50px;
        padding: 0px 16px;
        img {
            height: 100%;
            cursor: pointer;
        }
    }
    .layout-nav {
        width: 600px;
        min-width: 530px;
        margin: 0 40px;
        padding-bottom: 0;
        .layout-menu {
            display: flex;
            align-items: flex-end;
            background: transparent;
            border: none;
            font-size: 20px;
        }
    }
    .layout-search-box {
        position: relative;
        width: 390px;
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