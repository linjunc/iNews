import styled from 'styled-components'

export const HomeContainer = styled.div`
  margin-top: -64px; // 减去头部的64px
  .content {
    position: relative;
    left: 50%;
    margin-left: -500px;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    /* transform: translate(-50%, 0); */
    .main {
      min-height: 700px;
      width: 700px;
      margin: 20px 0;
      padding: 0 18px 50px 18px;
      background-color: #fff;
    }
    .home_right {
      width: 280px;
    }
    .fixed_box {
      position: fixed;
      top: 80px;
      left: 50%;
      margin-left: 230px;
    }
  }
`
