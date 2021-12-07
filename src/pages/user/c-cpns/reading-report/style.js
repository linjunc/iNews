import styled from 'styled-components'

export const ReadingReportWrapper = styled.div`
  width: 740px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid #ccc;
  
  .main-content {
    height: 100%;
    box-sizing: border-box;

    .title-img {
      width: 740px;
      height: 524px;
      background: url(${require('../../../../assets/user-center/report.png').default}) no-repeat;
      background-size: cover;
    }

    .report-img {
      width: 100%;
      padding-right: 40px;
      margin-top: 30px;
      border-radius: 15%;
    }
  }
`

export const CategoryRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding-left: 40px;
  color: #ea611d;
  font-size: 30px;
  font-weight: 600;

  & > div {
    display: flex;
    justify-content: space-between;
    height: 50px;

    .category {
      display: flex;
      align-items: center;
    }

    .bar-chart {
      width: 450px;
      margin-left: 40px;

      .num {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: rgba(45, 133, 160, .8);
        border-bottom: 1px solid rgba(72, 151, 225, .4);
        font-size: 18px;
        font-weight: 400;
      }
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