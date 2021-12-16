import styled from 'styled-components'

export const UserProfileWrapper = styled.div`
  .main-title {
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 24px;
    font-weight: 700;
  }

  & > div {
    flex-direction: column;
  }

  .items {
    margin-bottom: 13px;
    text-align: center;

    .item {
      display: inline-flex;
      justify-content: center;
      width: 556px;
      padding: 20px 0;
      border-bottom: 1px solid #f1f1f1;

      .input-title {
        width: 56px;
        font-size: 14px;
        color: #333;
        margin-right: 20px;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    margin: 50px;

    button {
      min-width: 88px;
      margin: 0 auto;
    }
  }
`
