const { SERVICES_INFO } = require('../../config');
const { getServiceHealth } = require('../../services/getServiceHealh');

const getHealth = async () => {
  const requests = SERVICES_INFO.map(getServiceHealth);
  const results = await Promise.allSettled([...requests]);

  const data = results.map((result) => {
    const { status, value, reason: e } = result;
    if (status === 'rejected') throw e;
    return value;
  });

  return data;
};

module.exports = { getHealth };
