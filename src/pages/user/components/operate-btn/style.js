import styled from 'styled-components'

export const EditBtnWrapper = styled.button`
  width: 118px;
  height: 34px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #1890ff;
  transition: all 0.3s;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 0.8;
  }
`

export const ConcernBtnWrapper = styled.button`
  width: 118px;
  height: 34px;
  transition: all 0.3s;
  border-radius: 4px;
  border: 1px solid #1890ff;
  cursor: pointer;
  outline: none;

  &.has-follow {
    background-color: #1890ff;
    color: #fff;
  }

  &.not-follow {
    background-color: #fff;
    color: #1890ff;
  }
`
