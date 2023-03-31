const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/idezet.php',
    createProxyMiddleware({
      target: 'https://api.citatum.hu',
      changeOrigin: true,
    })
  );
};