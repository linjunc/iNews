import styled from 'styled-components'
import LogoText from '../../../../assets/logo/logo_text.png'
// import LogoWhiteText from '../../../../assets/logo/logo_white_text.png'

export const SearchContainer = styled.main`
  position: relative;
  width: 100%;
  height: 70vh;
  .absolute-wrapper {
    display: grid;
    grid-template-rows: 1fr 3fr 2fr;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .search-wrapper {
      align-self: center;
      text-align: center;
      .logo-box {
        position: relative;
        display: inline-block;
        margin-bottom: 30px;
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
