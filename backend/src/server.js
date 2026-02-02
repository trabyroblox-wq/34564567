require('dotenv').config();
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('rate-limiter-flexible');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting (prevent abuse)
const rateLimiter = new rateLimit.RateLimiterMemory({
  points: 60,           // 60 requests
  duration: 60,         // per minute
});

app.use((req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).send('Too Many Requests – try again later'));
});

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // adjust if needed for proxy content
}));

app.use(cors());

// Serve frontend static files (optional – can be separate)
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Proxy route: /p/https://example.com/...
app.use('/p', createProxyMiddleware({
  target: '',
  changeOrigin: true,
  pathRewrite: { '^/p/': '' },
  router: (req) => {
    let target = req.url;
    if (!target.startsWith('http')) target = 'https://' + target;
    return target;
  },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    proxyReq.setHeader('Accept-Encoding', 'identity'); // avoid compression issues
  },
  onError: (err, req, res) => {
    res.status(502).send('Proxy Error – SUB v1');
  }
}));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', version: '1.0' }));

app.listen(PORT, () => {
  console.log(`SUB v1 Proxy running → http://localhost:${PORT}`);
  console.log(`Example: http://localhost:${PORT}/p/youtube.com`);
});
