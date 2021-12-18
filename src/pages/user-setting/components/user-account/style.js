import styled from 'styled-components'

export const UserAccountWrapper = styled.div`
  .item {
    display: flex;
    padding: 24px 0;
    border-bottom: 1px solid #f1f1f1;
    font-size: 14.4px;

    .tip-text {
      min-width: 250px;
      color: #333;
    }

    .right-wrapper {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      width: 100%;

      .state {
        margin-left: 20px;
        color: #909090;
      }

      .operate {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
`
