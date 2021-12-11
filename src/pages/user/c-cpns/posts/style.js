import { Button } from 'antd'
import styled from 'styled-components'

export const MarkedArea = styled.div`
  padding: 14px 20px;
  border-bottom: 2px solid #eee;

  .title {
    justify-content: space-between;

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
  }
`

// 初始化markdown所需要的css格式
export const MarkedContentWrapper = styled.div`
  /* button, textarea,input, object,select  { display:inline-block;}
  ol, ul, dir,menu, dd{ margin-left: 40px }
  i, cite, em,var, address{ font-style: italic }

  //块级元素
  html, body,  div,ol, p, ul,  h1, h2,h3,h4,h5, h6, 
  address,blockquote, form,
  dd,dl, dt, fieldset, frame, frameset,noframes,center, dir, hr, menu, pre   
  { display: block }

  //列表元素
  li{ display:list-item }
  ol{list-style-type: decimal }
  ol ul, ul ol,ul ul, ol ol  { margin-top: 0; margin-bottom: 0 }

  //标题 
  h1{ font-size:2em; margin: .67em 0 }
  h2{ font-size:1.5em; margin: .75em 0 }
  h3{ font-size:1.17em; margin: .83em 0 }
  h4, p,blockquote, ul,fieldset, form,ol, dl, dir,menu { margin: 1.12em 0}
  h5 { font-size:.83em; margin: 1.5em 0 }
  h6{ font-size:.75em; margin: 1.67em 0 }
  h1, h2, h3, h4,h5, h6, b, strong  { font-weight: bolder !important }

  h1, h2 {
    padding-bottom: 6.3px;
    border-bottom: 1px solid #eee;
  }

 ul {
   padding-left: 28px;
   list-style: disc;
   text-align: left;

   li {
    list-style: inherit;

    p {
      margin: 5px 0;
    }

    ul {
      margin-top: 3px;
    }
   }
  }

  li, p {
    line-height: 20px !important;
  }

  ul ul ul {
    list-style: square;
  }

  ol li,  ul li {
    list-style: inherit;
      line-height: inherit;
  } 

  li>ul {
      list-style: circle;
  }

  //伪类
  br:before{ content: ”\A” }
  :before, :after{ white-space: pre-line }
  :link, :visited { text-decoration: underline }
  :focus{ outline: thin dotted invert }


  //表格
  table{ display: table }
  tr{ display:table-row }
  thead{ display:table-header-group }
  tbody{ display:table-row-group }
  tfoot{ display:table-footer-group }
  col{ display:table-column }
  colgroup{ display:table-column-group }
  td, th{ display: table-cell;}
  caption{ display: table-caption }
  th{font-weight: bolder; text-align: center }
  caption{ text-align: center }
  table{ border-spacing: 2px;}
  thead, tbody,tfoot { vertical-align:middle }
  td, th { vertical-align:inherit }

  //其它元素
  blockquote{ margin-left: 40px;margin-right: 40px }
  pre, tt, code,kbd, samp  { font-family: monospace }
  pre{ white-space: pre}
  big{ font-size:1.17em }
  small, sub, sup{ font-size: .83em }
  sub{ vertical-align:sub }
  sup{ vertical-align:super }
  s, strike, del{ text-decoration: line-through }
  hr{ border: 1px inset }
  u, ins{ text-decoration:underline }
  center{ text-align: center }
  abbr, acronym{ font-variant: small-caps; letter-spacing:0.1em }

 BDO[DIR="ltr"]  { direction: ltr; unicode-bidi:bidi-override }
 BDO[DIR="rtl"]  { direction: rtl; unicode-bidi:bidi-override }
 /*定义BDO元素当其属性为DIR="ltr/rtl"时的默认文本读写显示顺序*/
  /* *[DIR="ltr"]{ direction: ltr;unicode-bidi: embed } */
  /* *[DIR="rtl"] { direction: rtl;unicode-bidi: embed } */
  /*定义任何元素当其属性为DIR="rtl/rtl"时的默认文本读写显示顺序*/
  /* @media print {  */
  /* h1{page-break-before: always } */
  /* h1, h2, h3,h4, h5, h6    { page-break-after: avoid } */
  /* ul, ol, dl{ page-break-before: avoid } */
  /* } 定义标题和列表默认的打印样式 */
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
