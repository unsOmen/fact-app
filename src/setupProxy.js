const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  app.use(
    createProxyMiddleware('/data', {
      target: 'https://open.faceit.com', // API endpoint 1
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      }
    })
  );

  app.use(
    createProxyMiddleware('/democracy', {
      target: 'https://api.faceit.com', // API endpoint 3
      changeOrigin: true,
      headers: {
        Connection: "keep-alive",
      }
    })
  );
}