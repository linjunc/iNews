import styled from 'styled-components'

export const BtmArticlescontainer = styled.div`
  .btm_aritles {
    padding-bottom: 20px;
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
    .media_user {
      display: flex;
      justify-content: left;
      align-items: center;
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
