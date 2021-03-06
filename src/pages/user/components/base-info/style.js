import styled from 'styled-components'

export const BaseInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  padding-top: 5px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  min-height: 189px;

  .avatar {
    flex: 0 0 auto;
    width: 70px;
    height: 70px;
    background-color: #f9f9f9;
    border-radius: 50%;
  }

  .info-box {
    flex-direction: column;
    flex: 1 1 auto;
    font-size: 14px;
    color: #72777b;

    .user-name {
      margin-bottom: 4px;
      max-width: 400px;

      span {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.2;
        color: #000;
      }

      img {
        margin: 0 0 9px 4px;
      }
    }

    .brief {
      svg {
        height: 21.6px;
        margin-right: 7.2px;
      }

      span {
        vertical-align: top;
      }
    }
  }

  .action-box {
    justify-content: space-between;
    margin: 2px 0;

    .link-box {
      display: flex;
      justify-content: space-between;
      width: 87px;
    }
  }
`
