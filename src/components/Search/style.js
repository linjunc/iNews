import styled, { keyframes } from 'styled-components'

const shake = keyframes`
  0% {
    transform: scale(1.1);
  }
  30% {
    transform: scale(1.1) rotateZ(-10deg);
  }
  60% {
    transform: scale(1.1) rotateZ(10deg);
  }
  100% {
    transform: scale(1.1);
  }
`

export const SearchWrapper = styled.div.attrs(
  ({ width, height, backgroundColor }) => ({
    width: width || 560,
    height: height || 50,
    backgroundColor: backgroundColor || '#fff',
  }),
)`
  position: relative;
  display: flex;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin: auto;
  line-height: ${(props) => props.height}px;
  border-radius: 10px;
  .input,
  .button {
    height: inherit;
    border: 2px solid transparent;
    line-height: inherit;
    transition: border-color 0.3s;
  }
  .input:focus,
  .input:focus + .button {
    border-color: #1890ff;
  }
  .input {
    width: ${(props) => props.width * 0.89}px;
    border-right: none;
    padding-left: 20px;
    background-color: ${(props) => props.backgroundColor};
    outline: none;
    border-radius: 10px 0 0 10px;
  }
  .button {
    width: ${(props) => props.width * 0.11}px;
    border-left: none;
    background-color: ${(props) => props.backgroundColor};
    color: #1890ff;
    font-size: ${(props) => props.height * 0.48}px;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    &:hover .icon {
      animation: ${shake} 0.3s forwards;
    }
  }
  .results {
    position: absolute;
    width: 100%;
    z-index: 1;
    left: 0;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    transform: translateY(100%);
    .result {
      .keyword {
        color: #1890ff;
      }
    }
  }
`
