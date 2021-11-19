require('dotenv-defaults').config();
const settings = require('../settings');

/* -- server -- */
const { HOST, PORT } = process.env;
const BASE_URL = `http://${HOST}:${PORT}`;

/* -- services info -- */
const { SERVICE_COUNT } = process.env;
const SERVICES_INFO = Array(Number(SERVICE_COUNT) || 0).fill(0).map((_, i) => ({
  name: process.env[`SERVICE_${i}_NAME`] || '',
  url: process.env[`SERVICE_${i}_URL`] || '',
}));

/* -- logger settings -- */
const { STAGE, LOGGER_TARGET, LOGGER_LEVEL } = settings;
const { NODE_ENV, LOG_TARGET, LOG_LEVEL } = process.env;
const { isTTY } = process.stdout;

let logTarget = NODE_ENV !== STAGE.PRODUCTION && LOG_TARGET ? LOG_TARGET : LOGGER_TARGET.STDOUT;
if (logTarget === LOGGER_TARGET.CONSOLE && !isTTY) logTarget = LOGGER_TARGET.STDOUT;
const logLevel = NODE_ENV !== STAGE.PRODUCTION && LOG_LEVEL ? LOG_LEVEL : LOGGER_LEVEL.INFO;

module.exports = {
  ...process.env,
  ...settings,
  BASE_URL,
  SERVICES_INFO,
  LOG_TARGET: logTarget,
  LOG_LEVEL: logLevel,
};
