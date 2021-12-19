import styled from 'styled-components'

export const TriggerWrapper = styled.ul`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  height: 5px;
  margin: auto;
  .trigger {
    width: 30px;
    height: inherit;
    margin: 0 5px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.35s, width 0.35s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`
