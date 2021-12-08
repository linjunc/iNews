import styled from 'styled-components'

export const InstrumentChartWrapper = styled.div`
  width: 400px;

  & > div {
    width: 360px !important;
  }

  canvas {
    margin-left: -36px !important;
    margin-top: -80px !important;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  height: 290px;
  font-size: 18px;
  font-weight: 700;
  font-family: SimHei;
  color: #605c56;
  white-space: nowrap;

  .text-info {
    width: 500px;
    margin-left: 20px;
    margin-top: 35px;

    p {
      margin-top: 20px;
      line-height: 24px;

      span {
        color: #ea611d;
        font-weight: bold;
        font-size: 22px;
      }
    }
  }
`
