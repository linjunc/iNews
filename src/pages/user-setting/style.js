import styled from 'styled-components'

export const UserSettingWrapper = styled.div`
  width: 1000px;
  min-height: 626px;
  margin: 24px auto;
  overflow: hidden;

  .main-title {
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 24px;
    font-weight: 700;
  }
`
export const SettingContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
export const RightContainerWrapper = styled.div`
  background-color: #fff;
  width: calc(100% - 254px);
  min-height: 626px;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
`
