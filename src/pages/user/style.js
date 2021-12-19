import styled from 'styled-components'

export const UserCenterWrapper = styled.div`
  display: flex;
  position: relative;
  max-width: 1000px;
  margin: 11px auto 72px;

  .ant-empty {
    margin-top: 100px;
  }

  .ant-skeleton {
    padding: 10px 20px;
  }
`
export const LeftContainerWrapper = styled.div`
  flex: auto;
  min-width: 0;
`

export const ContentWrapper = styled.div`
  min-height: 600px;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
`
