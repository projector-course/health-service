const { SERVICES_INFO } = require('../../config');
const { getServiceHealth } = require('../../services/getServiceHealh');

const getHealth = async (ctx) => {
  const requests = SERVICES_INFO.map(({ url }) => getServiceHealth(url));
  const results = await Promise.allSettled([...requests]);

  const data = results.map((result) => {
    const { status, value = {}, reason = {} } = result;
    if (status === 'fulfilled') return value;
    return ctx.throw(500, reason.message || '');
  });

  ctx.body = data;
};

module.exports = { getHealth };
