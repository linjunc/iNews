import styled from 'styled-components'

export const NavContainer = styled.div`
  @media screen and ((max-width: 767px)) {
    width: 100% !important;
    min-width: 100%;
  }
  /* position: sticky; */
  /* top: 0; */
  width: 700px;
  min-width: 530px;
  margin-left: -18px;
  /* margin: 0 20px; */
  padding-bottom: 0;
  .layout-menu {
    display: flex;
    align-items: center;
    height: 100%;
    /* background: transparent; */
    border: none;
    font-size: 18px;
  }
`
