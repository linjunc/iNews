import styled from 'styled-components'

export const Artilecontainer = styled.div`
  width: 100%;
  .article-node {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    /* width: 680px; */
    width: 100%;
    min-height: 150px;
    background-color: #ffffff;
    .left {
      max-width: 630px;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .article-top {
        .article-title {
          /* line-height: 30px; */
          line-height: 1.5;
          font-size: 24px;
          font-weight: 400;
          cursor: pointer;
        }
        .article-title:hover {
          color: #f04142;
        }
      }
      .article-bottom {
        color: #999;
        .media_name {
          cursor: pointer;
          margin-right: 20px;
        }
        .comment_count {
          cursor: pointer;
          margin-right: 20px;
        }
        .media_name:hover {
          color: #aaa;
        }
        .comment_count:hover {
          color: #aaa;
        }
        .publish_time {
        }
      }
    }
    .right {
      height: 100px;
      overflow: hidden;
      .article-img {
        height: 100%;
        cursor: pointer;
        transition: all 0.9s;
      }
      .article-img:hover {
        transform: scale(1.1);
      }
    }
  }
`
