import styled from 'styled-components'

export const MarkedArea = styled.div`
  padding: 14px 20px;
  border-bottom: 2px solid #eee;

  .title {
    justify-content: space-between;
    height: 32px;

    h1 {
      font-size: 1.28em;
      font-weight: bold;
      color: #40485b;
    }

    .edit {
      cursor: pointer;

      svg:hover {
        fill: #1772dc;
      }
    }

    .preview-btn {
      display: flex;
      align-items: center;
      padding: 0 8px;
      cursor: pointer;

      svg {
        margin-right: 5px;
        transition: all 0.3s;
      }

      &:hover {
        svg {
          fill: #1772dc;
        }
      }
    }
  }

  .ant-input {
    margin-top: 10px !important;
    height: 600px !important;
    resize: none;

    // 设置文本框滚动条的样式
    &::-webkit-scrollbar {
      width: 6px;
    }
    // 滚动槽
    &::-webkit-scrollbar-track {
      color: #fbfbfb;
    }
    // 滚动条滑块
    &::-webkit-scrollbar-thumb {
      background-color: rgb(221, 219, 219);
      border-radius: 10px;
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    }
  }
`

// 初始化markdown所需要的css格式
export const MarkedContentWrapper = styled.div`
  pre,
  code {
    font-size: 0.85em;
    font-family: Consolas, Inconsolata, Courier, monospace;
  }

  code {
    margin: 0 0.15em;
    padding: 0 0.3em;
    white-space: pre-wrap;
    border: 1px solid #eaeaea;
    background-color: #f8f8f8;
    border-radius: 3px;
    display: inline; /* added to fix Yahoo block display of inline code */
  }

  pre {
    font-size: 1em;
    line-height: 1.2em;
  }

  pre code {
    white-space: pre;
    overflow: auto; /* fixes issue #70: Firefox/Thunderbird: Code blocks with horizontal scroll would have bad background colour */
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 0.5em 0.7em;
    display: block !important;
  }

  p {
    margin: 0 0 10px 0 !important;
  }

  table,
  pre,
  dl,
  blockquote,
  q,
  ul,
  ol {
    margin: 1.2em 0;
  }

  ul,
  ol {
    padding-left: 2em;
    margin: 0;
  }

  li {
    margin: 0.5em 0;
    font-size: 16px;
  }

  li p {
    margin: 0.5em 0 !important;
  }

  /* Smaller spacing for sub-lists */
  ul ul,
  ul ol,
  ol ul,
  ol ol {
    margin: 0;
    padding-left: 1em;
  }

  /* Use letters for unordered-lists. (Like Github.) */
  ul ul,
  ul,
  ul {
    list-style-type: square;
    font-size: 16px;
  }

  /* Use letters for sub-ordered-lists. (Like Github.) */
  ol ol,
  ul ol {
    list-style-type: lower-roman;
  }

  /* Use Roman numerals for sub-sub-ordered lists. (Like Github.) */
  ul ul ol,
  ul ol ol,
  ol ul ol,
  ol ol ol {
    list-style-type: lower-alpha;
  }

  ul > li {
    list-style: disc;
  }

  dl {
    padding: 0;
  }

  dl dt {
    font-size: 1em;
    font-weight: bold;
    font-style: italic;
  }

  dl dd {
    margin: 0 0 1em;
    padding: 0 1em;
  }

  blockquote,
  q {
    border-left: 4px solid #ddd;
    padding: 0 1em;
    color: #777;
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 10px;
    padding: 0;
    font-weight: bold;
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 22px;
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 16px;
  }
  h6 {
    font-size: 16px;
    color: #777;
  }
  h1,
  h2 {
    padding-bottom: 6.3px;
    border-bottom: 1px solid #eee;
  }
  table {
    padding: 0;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 1em;
    font: inherit;
    border: 0;
  }

  tbody {
    margin: 0;
    padding: 0;
    border: 0;
  }

  table tr {
    border: 0;
    border-top: 1px solid #ccc;
    background-color: white;
    margin: 0;
    padding: 0;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  table tr th,
  table tr td {
    font-size: 1em;
    border: 1px solid #ccc;
    margin: 0;
    padding: 0.5em 1em;
  }

  table tr th {
    font-weight: bold;
    background-color: #f0f0f0;
  }

  p {
    font-size: 16px;
    line-height: 1.75em;
    padding-right: 0.5em;
    padding-left: 0.5em;
  }

  strong,
  b {
    font-weight: bolder !important;
  }
`
