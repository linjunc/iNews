import styled from 'styled-components'
export const ToTopWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  .wing {
    position: relative;
    height: 64px;
    z-index: 1002;
    bottom: -100px;
    left: -16px;
    transform: scale(0.01);
  }
  .guLi {
    position: relative;
    height: 123px;
    z-index: 1003;
    cursor: pointer;
  }
  .show {
    transform: scale(1);
  }
`
