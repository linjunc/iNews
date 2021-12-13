import styled from 'styled-components'

export const HotArticlecontainer = styled.div`
  .hot_article {
    .content {
      .main {
        .Carousel_node {
          position: relative;
          .hot_img {
            width: 100%;
            height: 500px;
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
        .slider_wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          .slider {
            display: flex;
            transition: all 1.5s;
            .slider_node {
              .hot_img {
                width: 85px;
                height: 75px;
              }
            }
          }
          .left_before,
          .right_next {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 30px;
            height: 75px;
            line-height: 75px;
            background-color: #eee;
            z-index: 99;
            text-align: center;
            color: #000;
            font-size: 21px;
            transition: all 0.3s;
            box-shadow: 0 10px 40px rgb(0 0 0 / 15%);
            cursor: pointer;
          }
          .left_before:hover,
          .right_next:hover {
            background-color: #1890ff;
            color: #fff;
          }
          .right_next {
            left: calc(100% - 30px);
          }
        }
      }
      .hot_right {
      }
    }
  }
`
