import styled from 'styled-components'

export const SecondNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28.8px;
  height: 50px;
  border-bottom: 2px solid rgba(230, 230, 231, 0.5);

  .title {
    margin-right: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #000;
  }

  .items {
    position: relative;
    padding: 12px 0;
    font-size: 14px;

    .item {
      position: relative;
      color: #72777b;

      &:hover {
        opacity: 0.8;
      }

      &.active {
        color: #000;
      }

      &:not(:last-child) {
        margin-right: 24px;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -12px;
          margin-top: -7px;
          width: 1px;
          height: 14px;
          background-color: #b2bac2;
          opacity: 0.5;
        }
      }
    }
  }
`
