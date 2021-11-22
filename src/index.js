const Koa = require('koa');
const { PORT, BASE_URL, SERVICE_NAME } = require('./services/configService');
const { getModuleLogger } = require('./services/logService');
const { koaLogger } = require('./middlewares/koaLogger');
const { getMetrics } = require('./middlewares/getMetrics');
const { router } = require('./api/router');

const logger = getModuleLogger(module);
logger.debug('APP CREATED');

new Koa()
  .use(getMetrics)
  .use(koaLogger)
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (e) => logger.error(e))
  .listen(PORT, () => logger.info(`${SERVICE_NAME} is running on ${BASE_URL}`));

process.on('unhandledRejection', (e) => {
  logger.error(e, 'Unhandled rejection at promise');
  logger.info('Server is still running...');
});

process.on('uncaughtException', (e) => {
  logger.fatal(e, 'Uncaught exception');
  process.nextTick(() => process.exit());
});
