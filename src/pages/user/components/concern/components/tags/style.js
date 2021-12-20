import styled from 'styled-components'
import { Empty } from 'antd'

export const MyEmpty = styled(Empty)`
  margin-top: 100px;
`
export const ConcernTagsWrapper = styled.div`
  .btn-group {
    display: inline-block;
    background: #fafafa;
    padding: 3px;
    margin: 10px 20px 0 0;
    border-radius: 2px;

    .btn-item {
      margin: 0 1px 0 0;
      transition: all 0.3s;
      background-color: transparent;
      border: none;
      line-height: 22px;
      padding: 2px 12px;
      font-size: 14px;
      color: #4e5969;
      cursor: pointer;

      &.active {
        color: #1890ff;
        background-color: #fff;
      }
    }
  }
`

export const TagListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`
