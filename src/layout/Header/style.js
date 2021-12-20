import styled from 'styled-components'

export const FixedContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s;
  border: 1px solid #f1f1f1;
  transform: translate3d(0, -100%, 0);
  background-color: #fff;
  z-index: 300;
`
export const MenuWrapper = styled.div`
  width: 1300px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .test {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 20px;
  }
  .layout-logo {
    height: 50px;
    padding: 0px 17.5px;
    img {
      height: 100%;
      cursor: pointer;
    }
  }
  .layout-search-box {
    position: relative;
    width: 200px;
    height: 36px;
    transition: all 0.3s;
    /* .layout-search {
      height: 100%;
      padding-left: 18px;
      padding-right: 52px;
      font-size: 16px;
      line-height: 20px;
      color: #222;
      border-radius: 5px;
      border: none;
      background-color: #f5f5f5 !important;
      input {
        background-color: inherit;
      }
    }
    .layout-search-button {
      position: absolute;
      right: 10px;
      height: 36px;
      font-size: 20px;
      color: #1890ff;
      border: none;
      background: none;
      z-index: 99;
      cursor: pointer;
    } */
  }
  .covid {
    cursor: pointer;
    width: 100px;
    text-align: center;
    padding: 10px 5px;
    margin-left: 10px;
    background-color: #e8f3ff;
    :hover {
      color: #1890ff;
    }
  }
  .search-focus {
    width: 320px !important;
  }
  .hide {
    display: none;
  }
`
