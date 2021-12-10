import styled from 'styled-components'

export const CarouselWrapper = styled.div`
  position: relative;
  width: inherit;
  height: inherit;
  .img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    transition: transform 0.35s ease-out;
    .img-layer {
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }
  .trigger-wrapper {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    width: 160px;
    height: 5px;
    margin: auto;
    .trigger {
      width: 40px;
      height: inherit;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 0.35s, width 0.35s;
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
`
