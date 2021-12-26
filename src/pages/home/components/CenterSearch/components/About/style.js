import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
  }
`

export const AboutContainer = styled.div`
  width: 240px;
  .logo {
    opacity: 0;
    width: inherit;
    animation: ${fadeIn} 0.3s 0.1s forwards;
  }
  .text {
    opacity: 0;
    text-indent: 20px;
    animation: ${fadeIn} 0.3s 0.4s forwards;
  }
`
