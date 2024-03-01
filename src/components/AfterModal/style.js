import styled from 'styled-components'

export const ModalContainer = styled.div`
  @media screen and ((max-width: 767px)) {
    bottom: -10px;
    top: inherit;
    right: 0px;
    height: 30vh;
  }
  position: fixed;
  top: 0;
  right: 0;
  width: 30px;
  height: 100vh;
  background-color: #74b9ff;
  opacity: 0.1;
  transition: all 0.5s;
  cursor: pointer;
  :hover {
    opacity: 0.3;
  }
`
export const DrawerBox = styled.div`
  display: flex;
  align-items: center;
  .author-article {
    display: flex;
    margin: 20px 0;
    cursor: pointer;
    width: 100%;
    .article-list-img {
      margin-right: 10px;
      img {
        width: 94px;
        height: 70px;
      }
    }
    .article-list-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .article-list-title {
        max-height: 48px;
        font-size: 16px;
        line-height: 24px;
        color: #222;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }
      .article-list-num {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 12px;
        color: #999999;
      }
    }
  }
`
