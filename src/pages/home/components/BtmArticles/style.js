import styled from 'styled-components'

export const BtmArticlescontainer = styled.div`
  .btm_bar {
    width: calc(100% + 36px);
    margin-left: -18px;
    height: 20px;
    background-color: #f4f5f5;
  }
  .btm_aritles {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    padding-top: 10px;
    .btm_aritles_top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .btm_aritles_img {
        width: 200px;
        height: 140px;
        cursor: pointer;
        object-fit: cover;
      }
      .btm_aritles_title {
        height: 45px;
        padding: 3px 5px;
        text-indent: 8px;
        font-weight: 600;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
    }
    .media_user {
      height: 50px;
      display: flex;
      justify-content: left;
      align-items: center;
      cursor: pointer;
      .mediaDetail {
        padding-left: 20px;
        display: flex;
        max-width: 120px;
        flex-direction: column;
        justify-content: space-around;
        .mediaName {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .description {
          padding-top: 3px;
          color: #aaa;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
      }
    }
  }
`
