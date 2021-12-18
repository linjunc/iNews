import styled from 'styled-components'

export const BannerWrapper = styled.div`
  display: flex;
  background-color: white;
  padding: 0 10px;
  .our-logo {
    user-select: none;
    margin-right: 10px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .our-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 0;
    font-size: 14px;
    .our-title {
      font-size: 16px;
      font-weight: 600;
      color: #1890ff;
    }
    .our-info {
      font-size: 12px;
    }
  }
`
