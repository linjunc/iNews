import styled from 'styled-components'

export const SettingNavWrapper = styled.div`
  @media screen and ((max-width: 767px)) {
    flex-direction: row;
    width: 100%;
  }
  display: flex;
  flex-direction: column;

  width: 230px;
  padding: 8px;
  background-color: #fff;

  a {
    width: 214px;
    height: 48px;
    font-size: 16px;
    color: #4e5969;

    i {
      margin-right: 12px;
      margin-left: 24px;
    }

    &:hover,
    &.active {
      background-color: #e8f3ff;
      color: #1890ff;

      svg {
        fill: #1890ff;
      }
    }
  }
`
