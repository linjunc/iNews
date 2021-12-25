// // 在src 目录下创建setupProxy.js文件
// const { createProxyMiddleware } = require('http-proxy-middleware');
// //注意写法，这是1.0以后的版本，最好按抄。这里的版本指的是'http-proxy-middleware
// module.exports = function (app) {
//   app.use(createProxyMiddleware('/api',
//     {
//       target: 'https://sm.ms/api/v2/',
//       /*
//       * 这里有一个小坑，如果重写地址我们的后台接口是不需要更改的，如果不配置重写，我们的后台也需要加上/api.
//       */
//       // pathRewrite: {
//       //     '^/api': '',
//       // },
//       changeOrigin: true,
//       secure: false, // 是否验证证书
//       ws: true, // 启用websocket
//     }
//   ));
// };
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/sm', {
      target: 'https://sm.ms/',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/sm': '',
      },
    }),
  )
}
