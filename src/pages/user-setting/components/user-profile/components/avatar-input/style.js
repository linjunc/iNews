import styled from 'styled-components'

export const AvatarInputWrapper = styled.div`
  margin-bottom: 20px;

  .avatar-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    .avatar-upload {
      position: relative;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      overflow: hidden;

      .upload-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        border-radius: 50%;
        background-color: rgba(29, 33, 41, 0.5);
        z-index: 2;
        opacity: 0;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }

        & > .avatar-uploader {
          height: 90px;
        }

        & > span {
          font-size: 14px;
          margin-top: 7px;
        }

        .add-icon {
          width: 20px;
          height: 20px;

          svg {
            fill: #fff;
          }
        }
      }
    }

    .title {
      margin: 10px 0 8px;
      color: #1d2129;
      font-size: 16px;
    }
  }

  .upload-tip {
    line-height: 17px;
    font-size: 14px;
    color: #86909c;
  }

  .ant-avatar {
    background-color: transparent;
  }
`
