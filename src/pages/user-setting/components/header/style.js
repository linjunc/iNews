import styled from 'styled-components'

export const SettingHeaderWrapper = styled.div`
  height: 46px;
  margin: 0 auto 16px;
  padding-left: 22px;
  background-color: #fff;

  a {
    color: #909090;
    font-size: 14px;
    cursor: pointer;

    .arrow {
      width: 9px;
      height: 9px;
      border: 2px solid #909090;
      border-top: none;
      border-right: none;
      transform: rotate(45deg);
      margin-right: 4px;
    }

    &:hover {
      color: #1890ff;

      .arrow {
        border-color: #1890ff;
      }
    }

    &::before {
      font-size: 22px;
    }
  }
`
