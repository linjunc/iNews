import styled from 'styled-components'

export const ReadingReportWrapper = styled.div`
  width: 740px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #fff;

  .main-content {
    height: 100%;
    box-sizing: border-box;
    margin-top: -10px;

    .title-img {
      width: 740px;
      height: 524px;
    }

    .report-img {
      width: 100%;
      padding-right: 40px;
      margin-top: 30px;
      border-radius: 15%;
    }
  }
`

export const TransitionWrapper = styled.div`
  .report-appear {
    transform: scale(0);
  }

  .report-appear-active {
    transform: scale(1);
    transition: height 1s, transform 1s;
  }
`
