const { SERVICES_INFO } = require('../../services/configService');
const { getServiceHealth } = require('../../services/getServiceHealh');
const { getModuleLogger } = require('../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const getHealth = async () => {
  const requests = SERVICES_INFO.map(getServiceHealth);
  const results = await Promise.allSettled([...requests]);

  const data = results.map((result) => {
    const { status, value, reason: e } = result;
    /* -- getServiceHealth error -- */
    if (status === 'rejected') throw e;
    /* -- if service ready -- */
    const { service, error } = value;
    if (!error) return value;
    /* -- if service not ready -- */
    const { type, message } = error;
    logger.warn({ service, type }, message);
    return value;
  });

  return data;
};

module.exports = { getHealth };
