import styled from 'styled-components'

export const Artilecontainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  width: 680px;
  background-color: #ffffff;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .article-top {
      .article-title {
        line-height: 30px;
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
    height: 120px;
    .article-img {
      height: 100%;
    }
  }
`
