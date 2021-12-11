import styled, { keyframes } from 'styled-components'
import LogoText from '../../../../assets/logo/logo_text.png'

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

export const SearchContainer = styled.main`
  position: relative;
  width: 100%;
  height: 70vh;
  .absolute-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .search-wrapper {
      margin-top: 60px;
      text-align: center;
      .search-box {
        width: 560px;
        height: 50px;
        margin: auto;
        background-color: #fff;
        line-height: 50px;
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
          border-color: rgba(24, 144, 255, 0.6);
        }
        .input {
          width: 500px;
          border-right: none;
          padding-left: 20px;
          vertical-align: top;
          outline: none;
          border-radius: 10px 0 0 10px;
        }
        .button {
          display: inline-block;
          width: 60px;
          border-left: none;
          color: #1890ff;
          font-size: 24px;
          cursor: pointer;
          border-radius: 0 10px 10px 0;
          &:hover .icon {
            animation: ${shake} 0.3s forwards;
          }
        }
      }
      .logo {
        height: 140px;
        /* transparent; */
        /* background-blend-mode: luminosity; */
        /* background-image: radial-gradient(clo); */
        /* .logo {
          width: 156px;
          height: 156px;
          object-fit: none;
          object-position: -10px -10px;
        }
        .text {
          width: 255px;
          height: 125px;
          object-fit: none;
          object-position: -170px -35px;
        } */
      }
    }
  }
`
