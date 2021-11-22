const { REQUEST_ERROR_TYPE, HttpRequestError } = require('../errors/httpRequestError');
const { getJson } = require('../utils/getJson');
const { SERVICE_STATUS } = require('./configService');
const { getModuleLogger } = require('./logService');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

function getServiceHealth({ name, url }) {
  return getJson(url)
    .then((data) => ({
      service: name, status: SERVICE_STATUS.READY, data, error: null,
    }))
    .catch((err) => {
      if (!(err instanceof HttpRequestError)) throw err;
      let status;
      const { type, message } = err;
      if (err.type === REQUEST_ERROR_TYPE.NETWORK_ERROR) {
        status = SERVICE_STATUS.NOT_AVAILABLE;
      } else status = SERVICE_STATUS.FAIL;
      return {
        service: name, status, data: null, error: { type, message },
      };
    });
}

module.exports = { getServiceHealth };
