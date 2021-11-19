const SERVICE_STATUS = {
  READY: 'ready',
  FAIL: 'fail',
  NOT_AVAILABLE: 'not_available',
};

const STAGE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

const LOGGER_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

const LOGGER_TARGET = {
  CONSOLE: 'console',
  STDOUT: 'stdout',
};

module.exports = {
  SERVICE_STATUS,
  STAGE,
  LOGGER_TARGET,
  LOGGER_LEVEL,
};
