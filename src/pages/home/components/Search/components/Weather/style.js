import styled from 'styled-components'

export const WeatherWrapper = styled.div`
  user-select: none;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 3fr 3fr 1fr;
  gap: 0 20px;
  .header {
    grid-column: 1 / 4;
    display: grid;
    grid-template: 1fr 1fr / 3fr 2fr;
    .temp {
      position: relative;
      font-size: 30px;
      &::after {
        content: '℃';
        position: absolute;
        top: 10%;
        left: 50%;
        font-size: 18px;
      }
    }
    .text {
      font-size: 20px;
      text-indent: 5px;
    }
    .icon {
      align-self: center;
      grid-area: 1 / 2 / 4 / 3;
      font-size: 48px;
    }
  }
  .forecast {
    text-align: center;
    .icon {
      font-size: 30px;
    }
  }
  .city {
    text-indent: 5px;
    grid-column: 1 / 3;
    cursor: pointer;
  }
`
