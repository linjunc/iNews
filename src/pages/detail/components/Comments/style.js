import styled from 'styled-components'

export const CommentReply = styled.div`
  /* tile uploaded pictures */
  .comment-action {
    padding-left: 8px;
    cursor: 'auto';
  }

  [class*='-col-rtl'] .comment-action {
    padding-right: 8px;
    padding-left: 0;
  }
  .content {
    font-size: 16pz;
    font-weight: 400;
    line-height: 24px;
    color: #222;
  }
  .reply {
    max-width: 600px;
    @media screen and ((max-width: 767px)) {
      width: 280px !important;
    }
  }
  .dianzan {
    width: 30px;
  }
`
