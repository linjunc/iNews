import styled from 'styled-components'

export const ConcernItemWrapper = styled.div`
  background-color: #fff;

  .text-nowrap {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .middle-item {
    display: flex;
    align-items: center;
  }

  .ant-skeleton {
    padding: 15px 0 0 28.8px;

    .ant-skeleton-title {
      width: 95% !important;
    }
  }

  .ant-skeleton-avatar-square {
    margin-top: 8px;
    width: 150px !important;
    height: 104px !important;
  }
`
