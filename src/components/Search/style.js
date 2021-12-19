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
  ({ height, backgroundColor, focusColor }) => ({
    height: height || 50,
    backgroundColor: backgroundColor || '#fff',
    focusColor: focusColor || '#1890ff',
  }),
)`
  position: relative;
  display: flex;
  height: ${(props) => props.height}px;
  margin: auto;
  background-color: ${(props) => props.backgroundColor};
  line-height: ${(props) => props.height * 0.85}px;
  border-radius: 5px;
  .holder {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 14px;
    color: #bfbfbf;
  }
  .input,
  .button {
    position: relative;
    height: inherit;
    border: 3px solid transparent;
    background-color: transparent;
    line-height: inherit;
    transition: border-color 0.3s;
  }
  .input:focus,
  .input:focus + .button {
    border-color: ${(props) => props.focusColor};
  }
  .input {
    width: 90%;
    border-right: none;
    padding: 0 10px;
    outline: none;
    border-radius: 5px 0 0 5px;
  }
  .button {
    width: 10%;
    padding-right: 30px;
    border-left: none;
    color: #1890ff;
    font-size: ${(props) => props.height * 0.6}px;
    text-align: start;
    cursor: pointer;
    border-radius: 0 5px 5px 0;
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
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0 0 5px 5px;
    transform: translateY(100%);
    .result {
      .keyword {
        color: #1890ff;
      }
    }
  }
`
