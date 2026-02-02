module.exports = {
  port: process.env.PORT || 3000,
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000', 'http://localhost:8080'],
  rateLimit: {
    points: 60,
    duration: 60,         // 60 requests per 60 seconds per IP
  },
  proxy: {
    defaultUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    timeout: 30000,
  }
};
