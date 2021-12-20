import styled from 'styled-components'

export const HomeContainer = styled.div`
  margin-top: -64px; // 减去头部的64px
  .content {
    position: relative;
    margin: 0 auto;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    .main {
      min-height: 620px;
      width: 700px;
      margin: 20px 0;
      padding: 0 18px;
      background-color: #fff;
      .btmLine {
        position: relative;
        font-size: 14px;
        font-weight: 500;
        color: #222222;
        text-align: center;
        margin: 15px 0;
        width: 100%;
        .title {
          position: relative;
          background-color: #fff;
          padding: 0px 10px;
          color: #666;
          user-select: none;
          z-index: 3;
        }
        ::before {
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          z-index: 2;
          width: 100%;
          height: 1px;
          background-color: #d9d9d9;
        }
      }
      .btm_aritles {
        padding-bottom: 20px;
        .btm_aritles_title {
          height: 45px;
          padding: 3px 5px;
          text-indent: 8px;
          font-weight: 600;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .media_user {
          display: flex;
          justify-content: left;
          align-items: center;
          .mediaDetail {
            padding-left: 20px;
            display: flex;
            max-width: 120px;
            flex-direction: column;
            justify-content: space-around;
            .mediaName {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }
            .description {
              padding-top: 3px;
              color: #aaa;
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .home_right {
      width: 280px;
    }
  }
  .hideBottom {
    position: fixed;
    bottom: -55px;
    right: 50px;
    width: 88px;
    height: 123px;
    img {
      transition: all 0.2s;
    }
  }
`
