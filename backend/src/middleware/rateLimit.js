const { RateLimiterMemory } = require('rate-limiter-flexible');
const config = require('../../config/default');

const limiter = new RateLimiterMemory({
  points: config.rateLimit.points,
  duration: config.rateLimit.duration,
});

module.exports = (req, res, next) => {
  limiter.consume(req.ip)
    .then(() => next())
    .catch(() => {
      res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: '60 seconds'
      });
    });
};
