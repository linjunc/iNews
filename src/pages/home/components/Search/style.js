import styled, { keyframes } from 'styled-components'
import LogoText from '../../../../assets/logo/logo_text.png'
// import LogoWhiteText from '../../../../assets/logo/logo_white_text.png'

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
      .logo-box {
        position: relative;
        display: inline-block;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          /* 方案一，黑字+白色底 */
          /* background-color: rgba(255, 255, 255, 0.7);
          filter: blur(40px); */

          /* 方案二，白字+模糊白字底 打光的感觉 */
          /* background: center / contain url(${LogoText}) no-repeat;
          filter: blur(8px); */

          /* 方案三，白字+模糊黑字底 描了个模糊黑边 */
          background: 3px -2px / contain url(${LogoText}) no-repeat,
            -3px 2px / contain url(${LogoText}) no-repeat,
            3px 2px / contain url(${LogoText}) no-repeat,
            -3px -2px / contain url(${LogoText}) no-repeat;
          filter: blur(5px);
          /* 方案四，黑字+模糊白字底 方案三的颜色互换 */
        }
      }
      .logo {
        position: relative;
        height: 140px;
        /* 方案五，白字+黑色阴影 */
        /* filter: drop-shadow(6px 6px 0px black); */
      }
    }
  }
`
