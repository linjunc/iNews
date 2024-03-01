import styled from 'styled-components'

export const ListHeaderWrapper = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 0.2rem 0.2rem 0 0;
  border-bottom: 1px solid #ebebeb;
  z-index: 100;
  transition: all 0.24s;

  .none {
    display: none;
  }

  &.sticky,
  &.stickyTop {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
  }

  &.sticky {
    top: 64px;
  }

  &.stickyTop {
    top: 0;
  }

  .container {
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;

    .content {
      display: flex;
      background-color: #fff;
      height: 50px;

      @media screen and ((max-width: 767px)) {
        max-width: 100%;
      }

      & > a,
      & > img {
        width: 98px;
        height: 50px;
        justify-content: center;
        color: #31445b;

        &:hover {
          opacity: 0.8;
        }
      }

      .active {
        color: #1890ff;
        box-shadow: inset 0 -2px 0 #1890ff;
      }
    }
  }

  .ant-avatar {
    background-color: transparent;
  }
`
