const { REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');
const { getHttpJson } = require('../utils/getHttpJson');
const { SERVICE_STATUS } = require('../config');

function getServiceHealth(url) {
  return getHttpJson(url)
    .then((data) => ({ status: SERVICE_STATUS.READY, data }))
    .catch((err) => {
      const { type } = err;
      if (type === REQUEST_ERROR_TYPE.NETWORK_ERROR) {
        return { status: SERVICE_STATUS.NOT_AVAILABLE, data: null };
      }
      return { status: SERVICE_STATUS.FAIL, data: null };
    });
}

module.exports = { getServiceHealth };
