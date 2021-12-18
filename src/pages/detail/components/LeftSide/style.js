import styled from 'styled-components'

export const SideWrapper = styled.div`
  display: flow-root;
  margin-left: -48px;
  width: 50px;
  transition: all 0.5s;
  .left-box {
    display: block;
    .left-clear {
      display: block;
      width: 0;
      height: 0;
    }
    .left-container {
      position: fixed;
      top: 160px;
      z-index: 100;
      transform: translateX(-60px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 350px;
      .size-controller {
        display: flex;
        /* display: inline-block; */
        width: 50px;
        .controller-title {
          width: 20px;
          font-size: 12px;
          line-height: 14px;
        }
      }
      div {
        display: block;
      }
    }
  }
`
