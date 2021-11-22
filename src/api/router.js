const Router = require('@koa/router');
const { getHealth } = require('./controllers/getHealth');

const router = new Router();

router.get('/health', async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);
  ctx.body = await getHealth();
});

module.exports = { router };
