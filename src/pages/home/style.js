import styled from 'styled-components'

export const HomeContainer = styled.div`
  .content {
    position: relative;
    left: 50%;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    transform: translate(-50%, 0);
    .main {
      width: 710px;
      padding: 0 18px 0px 18px;
      background-color: #fff;
    }
    .home_right {
      margin-left: -350px;
      width: 280px;
      height: 1500px;
      background-color: yellow;
    }
  }
`
