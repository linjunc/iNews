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
      padding: 0 15px;
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

export const SecondTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28.8px;
  height: 50px;
  background-color: #fff;

  .text {
    font-size: 15px;
    font-weight: 600;
    color: #000;
  }
`

export const MyButton = styled(Button)`
  background: #1890ff;
  border-radius: 4px;
`
