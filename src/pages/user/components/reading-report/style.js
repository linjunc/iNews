import styled from 'styled-components'
import { Button } from 'antd'

export const ReadingReportWrapper = styled.div`
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;

  .main-content {
    height: 100%;
    box-sizing: border-box;
    margin-top: -10px;

    .title-img {
      width: 100%;
      height: 508px;
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

export const MyButton = styled(Button)`
  background: #1890ff;
  border-radius: 4px;
`
