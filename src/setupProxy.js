const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  app.use(
    createProxyMiddleware('/data', {
      target: 'https://open.faceit.com',
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      }
    })
  );

  app.use(
    createProxyMiddleware('/democracy', {
      target: 'https://api.faceit.com',
      changeOrigin: true,
      headers: {
        Connection: "keep-alive",
      }
    })
  );
}