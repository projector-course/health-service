const Router = require('@koa/router');
const { getHealth } = require('./controllers/getHealth');

const router = new Router();

router.get('/health', getHealth);

module.exports = { router };
