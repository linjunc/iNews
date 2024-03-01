import styled from 'styled-components'

export const PageHeaderWrapper = styled.div`
  width: inherit;
  margin: 0 auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
  color: #fff;
  .page-header {
    @media screen and ((max-width: 767px)) {
      width: 100% !important;
      padding: 0px 20px;
      /* min-width: 100%; */
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    height: 60px;
    margin: auto;
    user-select: none;
    .left-box,
    .right-box {
      display: flex;
      align-items: center;
    }
    .left-box {
      > * {
        margin-right: 60px;
        cursor: pointer;
      }
    }
    .right-box {
      > * {
        margin-left: 60px;
        cursor: pointer;
      }
    }
  }
`
