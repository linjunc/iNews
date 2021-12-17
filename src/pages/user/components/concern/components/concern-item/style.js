import styled from 'styled-components'

export const ConcernItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 84px;
  padding: 6px 28.8px;
  cursor: pointer;
  border-bottom: 1px solid rgba(230, 230, 231, 0.5);

  &:hover {
    background: #fcfcfc;
  }

  .btn-style {
    justify-content: center;
    flex: 0 0 auto;
    margin-left: 12px;
    width: 88px;
    height: 28px;
    font-size: 12px;
    border: 1px solid #92c452;
    border-radius: 2px;
    border: 1px solid #92c452;
    transition: background-color 0.5s, color 0.5s;

    &:hover {
      opacity: 0.8;
    }
  }

  .not-follow {
    color: #92c452;
    background-color: #fff;
  }

  .has-follow {
    color: #fff;
    background-color: #92c452;
  }

  & > div {
    display: flex;
    align-items: center;

    .ant-avatar {
      margin-right: 20px;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      color: #2e3135;
    }
  }
`
