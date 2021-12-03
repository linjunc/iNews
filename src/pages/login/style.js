import styled from "styled-components";

export const LoginContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(230, 234, 243);
    user-select: none;
`

export const Title = styled.h2`
    font-size: 24px;
    font-weight: 500;
    padding: 16px 0;
`

export const LoginForm = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 65vh;
    /* width: 1500px; */
    width: 90%;
    margin: 50px 0px;
    background: rgba(216, 216, 216, 0.3);
    box-shadow: inset 0 0 6px rgba(255,255,255,0.5);
    backdrop-filter: blur(4px);
    border-radius: 30px;
    overflow: hidden;
`

export const LoginLeft = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  /* 粉 247, 143, 179 */
  background-color: rgba(255, 175, 64,.6);
  backdrop-filter: blur(2px);

`
export const LoginRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #e6eaf3;
    opacity: .9;
    .opacity {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 0 20px 20px 0;
      background-color: rgba(216, 216, 216, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 20px 20px 60px #bebebe;
      .logo {
        cursor: pointer;
      }
      .form-title {
        font-size: 25px;
        margin-bottom: 10px;
      }
      .form-wrap {
        width: 350px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-form {
          width: 100%;
          .input {
            width: 100%;
            height: 40px;
            border-radius: 5px;
            margin-top: 10px;
          }
        }
        .login-form-forgot {
          float: right;
        }
        .ant-col-rtl .login-form-forgot {
          float: left;
        }
        .login-form-button {
          margin: 10px 0;
          width: 100%;
        }
      }
    }
`

export const AboutUs = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    /* width: 1500px; */
    width: 90%;
    margin-bottom: 30px;
    .carousel-container {
        padding: 0 50px;
        height: 20vh;
        .carouselContent {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            height: 20vh;
            cursor: pointer;
            /* background-color: rgba(216, 216, 216, 0.3); */
        }
        .slick-dots {
            height: 3px;
            li {
                width: 50px !important;
                button {
                    width: 30px !important;
                    height: 6px !important;
                    background-color: black;
                }
            }
        }
    }
`

export const AboutTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
` 
// 左右按钮
export const ArrowL = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(-50%,-50%);
  padding: 5px;
  cursor: pointer;
  user-select: none;
  z-index: 99;
  opacity: .5;
  &:hover{
    background-color: rgba(255,255,255,.3);
  }
`;

export const ArrowR = styled.div`
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translate(-50%,-50%);
  cursor: pointer;
  padding: 5px;
  user-select: none;
  z-index: 99;
  opacity: .5;
  &:hover{
    background-color: rgba(255,255,255,.3);
  }
`

export const contentStyle = styled.div`
    height: 160px;
    background-color: royalblue;
`