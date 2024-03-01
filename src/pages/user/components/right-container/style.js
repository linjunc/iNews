import styled from 'styled-components'

export const RightContainerWrapper = styled.div`
  @media screen and ((max-width: 767px)) {
    display: none;
  }
  flex: 0 0 auto;
  margin-left: 12px;
  width: 240px;
  line-height: 1.2;

  .sticky {
    position: fixed;
    top: 76px;
    width: 240px;
    transition: all 0.2s;
  }

  .report-enter {
    width: 100%;
    height: 122px;
    margin-top: 10px;
    background: url(${require('../../../../assets/user-center/report-enter.png')
        .default})
      no-repeat;
    background-size: cover;
    border-radius: 4px;
    cursor: pointer;
  }

  .report-appear {
    max-height: 0;
  }

  .report-appear-active {
    max-height: 120px;
    transition: max-height 1s;
  }

  .operate-area {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .go-back {
      width: 32px;
      height: 32px;
      background-image: url(${require('../../../../assets/user-center/go-back1.png')
        .default});
      background-size: cover;
      cursor: pointer;

      &:hover {
        background-image: url(${require('../../../../assets/user-center/go-back2.png')
          .default});
      }
    }
  }
`

export const UserAchievementWrapper = styled.div`
  background-color: #fff;
  margin-bottom: 12px;

  .title {
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #31445b;
    border-bottom: 1px solid rgba(230, 230, 231, 0.5);
  }

  .items {
    padding: 15px;

    .item {
      display: flex;
      align-items: center;

      &:nth-child(n + 2) {
        margin-top: 12px;
      }

      svg {
        margin-right: 14.4px;
      }

      span {
        display: inline-block;
        font-size: 15px;
        color: #000;
      }
    }
  }
`

export const CollectionInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  a,
  & > div {
    display: flex;
    justify-content: space-between;
    padding: 15px 5px;
    font-size: 15px;
    color: #000;
    border-top: 1px solid rgba(230, 230, 231, 0.5);
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const FollowNumWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 2px;

  a {
    flex: 1;
    padding: 16px 0;

    p {
      text-align: center;
      color: #31445b;
    }

    .title {
      font-size: 16px;
    }

    .concern-num {
      margin-top: 6px;
      font-size: 15px;
      font-weight: 700;
    }
  }
`
