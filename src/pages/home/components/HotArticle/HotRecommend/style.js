import styled from 'styled-components'

export const HotRecommendWrapper = styled.div`
  min-height: 700px;
  margin-top: 20px;
  .hot_recommend {
    .author-article {
      display: flex;
      margin: 20px 0;
      cursor: pointer;
      .article-list-img {
        margin-right: 10px;
        img {
          width: 94px;
          height: 70px;
        }
      }
      .article-list-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .article-list-title {
          max-height: 48px;
          font-size: 16px;
          line-height: 24px;
          color: #222;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .article-list-title:hover {
          color: #1890ff;
        }
        .article-list-num {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 12px;
          color: #999999;
        }
      }
    }

    .hot-advertise {
      display: flex;
      background-color: white;
      padding: 0 10px;
      .our-logo {
        user-select: none;
        margin-right: 10px;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .our-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 14px 0;
        font-size: 14px;
        .our-title {
          font-size: 16px;
          font-weight: 600;
          color: #1890ff;
        }
        .our-info {
          font-size: 12px;
        }
      }
    }
  }
`
