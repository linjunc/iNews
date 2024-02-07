import styled from 'styled-components'

export const DetailWrapper = styled.main`
  position: relative;
  width: 1000px;
  margin: 40px auto 0px;
  padding: 0 18px 0px 0px;
  display: flex;
  transition: all 0.5s;
  font-size: 16px;
  div {
    // display: inline-block;
    vertical-align: top;
  }
  .left-sidebar {
    display: flow-root;
    margin-left: -48px;
    width: 50px;
    transition: all 0.5s;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 350px;
        .size-controller {
          display: flex;
          /* display: inline-block; */
          width: 50px;
          .controller-title {
            width: 20px;
            font-size: 12px;
            line-height: 14px;
          }
        }
        div {
          display: block;
        }
      }
    }
  }
  .main {
    min-width: 900px;
    margin: 0px 20px 0px 60px;
    transition: all 0.5s;
    background-color: white;
    padding: 30px;
    line-height: 1.5;
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
      width: 100%;
      overflow: hidden;
      h1 {
        font-size: 30px;
        line-height: 1.5;
        font-weight: bold;
      }
      p {
        line-height: 1.8;
        /* text-indent: 2em; */
        margin: 15px 0;
      }
      section > img {
        width: 80% !important;
      }
    }
  }
  .comment-container {
    position: relative;
    // display: flex;
    margin: 50px 0;
    padding: 50px 0;
    // background-color: skyblue;
    .comment-content {
      display: block;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: #222;
    }
  }
  /* tile uploaded pictures */
  .comment-action {
    padding-left: 8px;
    cursor: 'auto';
  }

  [class*='-col-rtl'] .comment-action {
    padding-right: 8px;
    padding-left: 0;
  }
  .right-sidebar {
    position: relative;
    min-width: 278px;
    /* background-color: pink; */
    display: flex;
    flex-direction: column;
    .author-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 0;
      .author-head {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        margin-bottom: 10px;
        img {
          height: 100%;
        }
      }
      .author-des {
        font-size: 14px;
        color: #666666;
        margin-bottom: 10px;
        line-height: 1.5;
      }
      .author-love {
        color: white;
        transition: all 0.3s;
      }
      div {
        margin: 4px 0;
      }
    }
    .sticky-box {
      position: fixed;
      opacity: 0;
      width: 278px;
      transition: all 0.2s;
      z-index: -1;
      top: 30px;
    }
    .show {
      opacity: 1 !important;
      z-index: 1 !important;
    }
  }
  .right-button {
    display: flow-root;
    width: 50px;
    height: 100vh;
    margin-right: 100px;
    .right-end-box {
      display: block;
      .right-clear {
        display: block;
        width: 0;
        height: 0;
      }
      .right-container {
        position: fixed;
        bottom: 50px;
        transform: translateX(35px);
        z-index: 100;
        div {
          display: block;
        }
      }
    }
  }
  .article-content-inner .pgc-img {
    text-align: center;
  }
`
