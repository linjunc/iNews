import styled from 'styled-components'

export const HomeContainer = styled.div`
  margin-top: -64px; // 减去头部的64px
  .content {
    @media screen and ((max-width: 767px)) {
      width: 100% !important;
    }
    position: relative;
    margin: 0 auto;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    .main {
      @media screen and ((max-width: 767px)) {
        width: 100% !important;
        min-height: unset;
      }
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
    }
    .home_right {
      @media screen and ((max-width: 767px)) {
        display: none;
      }
      width: 280px;
    }
  }
  .hideBottom {
    position: fixed;
    bottom: -55px;
    right: 50px;
    width: 88px;
    height: 123px;
    z-index: 10000;
    @media screen and ((max-width: 767px)) {
      /* transform: translateX(100px); */
      right: -30px;
    }
    img {
      transition: all 0.2s;
    }
  }
  .feedback-bottom {
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 10000;

    @media screen and ((max-width: 767px)) {
      /* transform: translateX(100px); */
      right: 30px;
      bottom: 80px;
    }
  }
`
