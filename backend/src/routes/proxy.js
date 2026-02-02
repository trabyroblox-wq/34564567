const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../../config/default');

module.exports = (app) => {
  app.use('/p', createProxyMiddleware({
    target: '',
    changeOrigin: true,
    pathRewrite: { '^/p/': '' },
    router: (req) => {
      let target = req.url;
      if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
      return target;
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('User-Agent', config.proxy.defaultUserAgent);
      proxyReq.setHeader('Accept-Encoding', 'identity');
    },
    onError: (err, req, res) => {
      res.status(502).send('Proxy connection failed');
    },
    timeout: config.proxy.timeout,
    proxyTimeout: config.proxy.timeout
  }));
};
