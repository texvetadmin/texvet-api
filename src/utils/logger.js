// import pino from 'pino';
const pino = require('pino');

const logger = pino({
  name: process.env.PROJECT_NAME,
  level: process.env.NODE_ENV !== 'production' ? 'trace' : 'warn',
  enabled: process.env.NODE_ENV !== 'test',
  prettyPrint: process.env.NODE_ENV !== 'production',
});

module.exports = { logger };
