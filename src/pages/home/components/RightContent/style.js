import styled from 'styled-components'

export const RightContentWrapper = styled.div`
  width: 280px;
  .right_content {
    position: sticky;
    top: 80px;
    margin-top: 20px;
    padding: 0px 5px;
    .info {
      padding: 10px;
      display: flex;
      justify-content: space-around;
      background-color: #fff;
      border-radius: 10px;
      .logo {
        width: 100px;
        height: 100px;
      }
      .wrapper {
        margin-right: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        cursor: pointer;
        .title {
          display: flex;
          flex-direction: column;
          text-align: center;
          line-height: 22px;
          font-weight: 600;
          color: #505050;
        }
        .btnWrapper {
          display: flex;
          justify-content: center;
          .loginBtn {
            width: 80px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 7px;
          }
        }
        .avatar {
          position: relative;
          left: 50%;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transform: translate(-50%, 0);
          overflow: hidden;
          .avatarImg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .hot_rank {
      .rank {
        margin-right: 15px;
        font-size: 22px;
        color: #aaa;
      }
      .rank[ranknum='0'] {
        color: rgb(180, 15, 15);
      }
      .rank[ranknum='1'] {
        color: rgb(228, 58, 58);
      }
      .rank[ranknum='2'] {
        color: rgb(248, 100, 8);
      }
      .title {
        font-weight: 600;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .title:hover {
        color: #1890ff;
      }
    }
  }
`
