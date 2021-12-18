import styled from 'styled-components'

export const HomeContainer = styled.div`
  margin-top: -64px; // 减去头部的64px
  .content {
    position: relative;
    /* left: 50%; */
    /* margin-left: -500px; */
    /* left: 0;
    right: 0; */
    margin: 0 auto;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    .main {
      min-height: 700px;
      width: 700px;
      margin: 20px 0;
      padding: 0 18px 50px 18px;
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
      width: 280px;
      /* transition: all .5s; */
      /* transition: top 0.5s; */
    }
    .fixed_box {
      position: fixed;
      top: 80px;
      left: 50%;
      margin-left: 220px;
      opacity: 1;
    }
  }
`
