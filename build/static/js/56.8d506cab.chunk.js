(this.webpackJsonpinews=this.webpackJsonpinews||[]).push([[56],{1035:function(n,t,e){"use strict";e.r(t),e.d(t,"default",(function(){return y}));var r,a,c,i,o=e(290),s=e.n(o),u=e(291),l=e(35),d=e(0),f=e(9),b=e(297),p=e(169),j=e(66),g=e(45),x=e(378),O=e(72),v=e(67),m=e(68),h=m.b.div(r||(r=Object(v.a)(["\n  width: 25%;\n  margin-bottom: 15.6px;\n  padding: 0 8.4px;\n  box-sizing: border-box;\n\n  .tag-container {\n    flex-direction: column;\n    justify-content: center;\n    width: 100%;\n    border: 1px solid #f1f1f1;\n    text-align: center;\n    padding: 18px 0;\n\n    .round {\n      justify-content: center;\n      width: 50px;\n      height: 50px;\n      margin-bottom: 10px;\n      border-radius: 50%;\n      background-color: rgba(24, 144, 255, 0.8);\n      color: #fff;\n      font-size: 18px;\n    }\n  }\n\n  .btn {\n    width: 70px;\n    height: 32px;\n    transition: all 0.3s;\n    border-radius: 4px;\n    border: 1px solid #1890ff;\n    cursor: pointer;\n    outline: none;\n    margin-top: 10px;\n    font-size: 15px;\n    outline: none;\n\n    &:hover {\n      opacity: 0.8;\n    }\n  }\n\n  .not-concern {\n    background-color: #fff;\n    color: #1890ff;\n  }\n\n  .has-concern {\n    background-color: #1890ff;\n    color: #fff;\n  }\n"]))),k=e(7),w=Object(d.memo)((function(n){var t=n.tagInfo,e=t.name,r=t.tag,a=t.is_follow,c=void 0!==a&&a,i=Object(d.useState)(c),o=Object(l.a)(i,2),s=o[0],u=o[1],f=function(n){return Object(b.d)("concernTagLists",JSON.stringify(n))},p=function(){return JSON.parse(Object(b.b)("concernTagLists")||"[]")};return Object(k.jsx)(h,{children:Object(k.jsxs)("div",{className:"tag-container middle-item",children:[Object(k.jsx)("div",{className:"round middle-item",children:e}),Object(k.jsx)("button",{className:"btn"+(s?" has-concern":" not-concern"),onClick:function(){var n=p();if(s){var t=p(),e=t.indexOf(r);e>-1&&t.splice(e,1),f(t),Object(g.b)({tag_list:t})}else{var a=[].concat(Object(O.a)(n),["".concat(r)]);f(a),Object(g.b)({tag_list:a})}u(!s)},children:s?"\u5df2\u5173\u6ce8":"\u5173\u6ce8"})]})})})),S=(Object(m.b)(j.a)(a||(a=Object(v.a)(["\n  margin-top: 100px;\n"]))),m.b.div(c||(c=Object(v.a)(["\n  .btn-group {\n    display: inline-block;\n    background: #fafafa;\n    padding: 3px;\n    margin: 10px 20px 0 0;\n    border-radius: 2px;\n\n    .btn-item {\n      margin: 0 1px 0 0;\n      transition: all 0.3s;\n      background-color: transparent;\n      border: none;\n      line-height: 22px;\n      padding: 2px 12px;\n      font-size: 14px;\n      color: #4e5969;\n      cursor: pointer;\n\n      &.active {\n        color: #1890ff;\n        background-color: #fff;\n      }\n    }\n  }\n"])))),N=m.b.ul(i||(i=Object(v.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: 10px;\n"])));function y(){var n=Object(f.g)().id,t=(JSON.parse(Object(b.a)("userInfo"))||{}).user_id,e=Object(d.useState)(!0),r=Object(l.a)(e,2),a=r[0],c=r[1],i=Object(d.useState)([]),o=Object(l.a)(i,2),O=o[0],v=o[1],m=Object(d.useState)(!1),h=Object(l.a)(m,2),y=h[0],_=h[1],I=t===n;return Object(d.useEffect)((function(){var e=function(){var e=Object(u.a)(s.a.mark((function e(){var r,a,i,o,u,l,d,f,j,x,O,m;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),e.prev=1,i=function(n){return Object(g.l)({user_id:n,n:40,skip:0})},o=[],o=Object(b.a)("token")?I?[i(n)]:[i(n),i(t)]:[i(n)],e.next=7,Promise.all(o);case 7:if(u=e.sent,l=u[0].data.tag_list,d=(null===(r=u[1])||void 0===r?void 0:r.data)||{},f=d.tag_list,j=(null===(a=I?l:f)||void 0===a?void 0:a.map((function(n){return n.tag})))||[],Object(b.d)("concernTagLists",JSON.stringify(j)),y||!l){e.next=16;break}v(l),e.next=23;break;case 16:if(!l){e.next=23;break}return e.next=19,Object(g.c)();case 19:x=e.sent,O=x.data,m=(O||{}).tag_list,v(m);case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(1),p.b.error("\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01");case 28:return e.prev=28,c(!1),e.finish(28);case 31:case"end":return e.stop()}}),e,null,[[1,25,28,31]])})));return function(){return e.apply(this,arguments)}}();e()}),[y,I,t,n]),Object(k.jsxs)(S,{children:[t===n&&Object(k.jsxs)("div",{className:"btn-group",children:[Object(k.jsx)("button",{className:"btn-item"+(y?"":" active"),onClick:function(n){return _(!1)},children:"\u5df2\u5173\u6ce8\u6807\u7b7e"}),Object(k.jsx)("button",{className:"btn-item"+(y?" active":""),onClick:function(n){return _(!0)},children:"\u5168\u90e8\u6807\u7b7e"})]}),Object(x.a)(O.length?Object(k.jsx)(N,{children:O.map((function(n){var t=n.name;return Object(k.jsx)(w,{tagInfo:n},t)}))}):Object(k.jsx)(j.a,{description:"\u6682\u65f6\u8fd8\u6ca1\u6709\u5173\u6ce8\u6807\u7b7e\u54e6\uff01"}),{rows:2},a)]})}},290:function(n,t,e){n.exports=e(171)},291:function(n,t,e){"use strict";function r(n,t,e,r,a,c,i){try{var o=n[c](i),s=o.value}catch(u){return void e(u)}o.done?t(s):Promise.resolve(s).then(r,a)}function a(n){return function(){var t=this,e=arguments;return new Promise((function(a,c){var i=n.apply(t,e);function o(n){r(i,a,c,o,s,"next",n)}function s(n){r(i,a,c,o,s,"throw",n)}o(void 0)}))}}e.d(t,"a",(function(){return a}))},297:function(n,t,e){"use strict";e.d(t,"a",(function(){return r})),e.d(t,"c",(function(){return a})),e.d(t,"b",(function(){return c})),e.d(t,"d",(function(){return i}));var r=function(n){return localStorage.getItem(n)},a=function(n,t){localStorage.setItem(n,t)},c=function(n){return sessionStorage.getItem(n)},i=function(n,t){sessionStorage.setItem(n,t)}},378:function(n,t,e){"use strict";e.d(t,"a",(function(){return c}));e(0);var r=e(276),a=e(7),c=function(n){for(var t=arguments.length,e=new Array(t>1?t-1:0),c=1;c<t;c++)e[c-1]=arguments[c];var i=e[0],o=void 0===i?{rows:3}:i,s=e[1],u=e[2],l=void 0!==u&&u;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(r.a,{paragraph:o,active:!0,avatar:l,loading:s,className:"Skeleton",children:n}),Object(a.jsx)(r.a,{paragraph:o,active:!0,avatar:l,loading:s,className:"Skeleton"}),Object(a.jsx)(r.a,{paragraph:o,active:!0,avatar:l,loading:s,className:"Skeleton"})]})}}}]);
//# sourceMappingURL=56.8d506cab.chunk.js.map