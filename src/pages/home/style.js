import styled from 'styled-components'

export const HomeContainer = styled.div`
  margin-top: -64px; // 减去头部的64px
  .content {
    position: relative;
    left: 50%;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    transform: translate(-50%, 0);
    .main {
      min-height: 700px;
      width: 710px;
      margin: 20px 0;
      padding: 0 18px 50px 18px;
      background-color: #fff;
    }
    .home_right {
      margin-left: -350px;
      width: 280px;
    }
  }
`
