import styled from 'styled-components'

export const GraphWrapper = styled.div`
  height: 430px;
  overflow: hidden;
  background-color: rgba(365, 365, 365, .8);
  border-radius: 10px;

  & > div {
    width: 900px !important;
  }

  canvas {
    margin-left: 43px !important;
  }
`