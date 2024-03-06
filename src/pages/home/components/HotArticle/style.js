import styled from 'styled-components'

export const HotArticlecontainer = styled.div`
  .hot_article {
    .content {
      .main {
        width: 700px;
        @media screen and ((max-width: 767px)) {
          .Carousel_node {
            padding: 10px 0 !important;
            .hot_img {
              height: 300px !important;
            }
            .vague {
              height: 300px !important;
              top: 10px !important;
            }
            .title {
              font-size: 20px !important;
              line-height: 1.5 !important;
            }
            .abstract {
              padding-top: 10px !important;
              line-height: 1.5 !important;
            }
          }
        }
        .Carousel_node {
          position: relative;
          padding: 20px 0;
          cursor: pointer;

          .hot_img {
            width: 100%;
            height: 464px;
          }
          .vague {
            position: absolute;
            top: 20px;
            left: 0;
            height: 464px;
            width: 100%;
            background-color: black;
            opacity: 0.6;
          }
          .detail {
            position: absolute;
            bottom: 30px;
            padding: 20px;
            color: #ddd;
            font-weight: 700;
            letter-spacing: 2px;
            .title {
              color: #ddd;
              font-size: 30px;
              line-height: 1.7;
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
              line-height: 1.7;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
`
