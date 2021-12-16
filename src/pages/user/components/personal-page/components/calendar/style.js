import styled from 'styled-components'

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding: 0 10px;

  .title {
    font-size: 1.28em;
    font-weight: bold;
    color: #40485b;
  }
`

export const CalendarWrapper = styled.div`
  margin: 5px 0 10px 0;

  .react-calendar-heatmap text {
    font-size: 10px;
    fill: #aaa;
  }

  svg {
    transform: translateX(-7px);
  }

  g.react-calendar-heatmap-weekday-labels {
    transform: translate(0, 14) !important;
  }

  g.react-calendar-heatmap-weekday-labels text {
    font-size: 10px;
  }

  rect {
    cursor: pointer;
    stroke: #fff !important;
    fill-opacity: 0.7;
    outline: none;

    &:hover {
      fill-opacity: 1;
    }
  }

  .react-calendar-heatmap .color-news-0 {
    fill: #e7e7e7ee;
  }
  .react-calendar-heatmap .color-news-1 {
    fill: #b8d7f3;
  }
  .react-calendar-heatmap .color-news-2 {
    fill: #7fb9ed;
  }
  .react-calendar-heatmap .color-news-3 {
    fill: #1890ff;
  }
  .react-calendar-heatmap .color-news-4 {
    fill: #2181d8;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: #40485b;

  .statistics {
    display: flex;
    flex-direction: column;

    .all-read-time {
      margin: 0 20px 10px 0;

      .num {
        font-weight: 600;
        color: #1890ff;
      }
    }
  }

  .color-show-box {
    display: flex;
    align-items: center;

    .color-box {
      display: flex;
      justify-content: space-between;
      width: 80px;
      margin: 0 5px;

      & > div {
        width: 14px;
        height: 14px;
        border-radius: 3px;
        cursor: pointer;
      }

      & > div:nth-child(1) {
        background-color: #e7e7e7ee;
      }

      & > div:nth-child(2) {
        background-color: #b8d7f3;
      }

      & > div:nth-child(3) {
        background-color: #7fb9ed;
      }

      & > div:nth-child(4) {
        background-color: #1890ff;
      }

      & > div:nth-child(5) {
        background-color: #2181d8;
      }
    }
  }

  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #1890ff;
  }
`
