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
`
