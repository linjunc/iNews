import styled from 'styled-components'

export const GraphWrapper = styled.div`
  height: 430px;
  overflow: hidden;
  background-color: rgba(365, 365, 365, 0.8);

  & > div {
    width: 980px !important;
  }

  canvas {
    margin-left: 26px !important;
    margin-top: 12px !important;
  }
`
