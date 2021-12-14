import styled from 'styled-components'

export const HotArticlecontainer = styled.div`
  .hot_article {
    .content {
      .main {
        .Carousel_node {
          position: relative;
          padding: 20px 0;
          .hot_img {
            width: 100%;
            height: 500px;
          }
          .vague {
            position: absolute;
            top: 20px;
            left: 0;
            height: 500px;
            width: 100%;
            background-color: black;
            opacity: 0.6;
          }
          .detail {
            position: absolute;
            bottom: 30px;
            padding: 20px;
            color: #fff;
            font-weight: 700;
            .title {
              color: #fff;
              font-size: 30px;
              line-height: 1.5;
              cursor: pointer;
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }
            .title:hover {
              color: #1890ff;
            }
            .abstract {
              padding-top: 20px;
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .hot_right {
      }
    }
  }
`
