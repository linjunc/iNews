import styled from 'styled-components'

export const SliderWrapper = styled.div`
  .slider_wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .slider {
      display: flex;
      position: relative;
      .slider_node {
        position: relative;
        .hot_img {
          width: 90px;
          height: 75px;
        }
      }
    }
    .left_before,
    .right_next {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 30px;
      height: 75px;
      line-height: 75px;
      background-color: #eee;
      z-index: 99;
      text-align: center;
      color: #000;
      font-size: 21px;
      transition: all 0.3s;
      box-shadow: 0 10px 40px rgb(0 0 0 / 15%);
      cursor: pointer;
    }
    .left_before:hover,
    .right_next:hover {
      background-color: #1890ff;
      color: #fff;
    }
    .right_next {
      left: calc(100% - 30px);
    }
  }
`
