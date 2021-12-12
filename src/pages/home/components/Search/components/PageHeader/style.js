import styled from 'styled-components'

export const PageHeaderWrapper = styled.div`
  width: inherit;
  margin: 0 auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
  color: #fff;
  .page-header {
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
