import styled from 'styled-components'

export const FormInputWrapper = styled.div`
  position: relative;

  textarea {
    @media screen and ((max-width: 767px)) {
      width: 300px;
    }
    width: 440px;
    padding: 0 48px 0 12px;
    resize: none;
    height: 30px;
    line-height: 30px;
    color: #1d2129;
    background-color: #fafafa;
    box-shadow: none;

    &:focus {
      background-color: #fff !important;
      border-color: #1890ff !important;
    }

    &:hover {
      border-color: #e5e6eb;
      background-color: #e5e6eb;
    }
  }

  .introduction {
    textarea {
      height: 140px;
    }

    &::after {
      top: 122px !important;
    }
  }

  .ant-input-textarea-show-count::after {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
    font-size: 12px;
  }
`
