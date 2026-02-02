const helmet = require('helmet');
const cors = require('cors');
const config = require('../../config/default');

module.exports = (app) => {
  app.use(helmet({
    contentSecurityPolicy: false, // CSP often breaks proxied content
    referrerPolicy: { policy: 'no-referrer-when-downgrade' }
  }));

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
};
