import styled from 'styled-components'

export const Artilecontainer = styled.div`
  width: 100%;
  .article-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    width: 100%;
    min-height: 120px;
    background-color: #ffffff;
    .left {
      /* flex: 0.99; */
      flex: 1;
      /* width: 620px; */
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .article-top {
        padding-bottom: 12px;
        .article-title {
          line-height: 1.5;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .article-title:hover {
          /* color: #f04142; */
          color: #1890ff;
        }
      }
      .article-center {
        padding-bottom: 12px;
        .article-abstract {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          color: #666;
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
      width: 158px;
      height: 118px;
      overflow: hidden;
      .article-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        cursor: pointer;
        transition: all 0.9s;
      }
      .article-img:hover {
        transform: scale(1.1);
      }
    }
  }
`
