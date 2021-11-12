const { REQUEST_ERROR_TYPE, HttpRequestError } = require('../errors/httpRequestError');
const { getJson } = require('../utils/getJson');
const { SERVICE_STATUS } = require('../config');

function getServiceHealth({ name, url }) {
  return getJson(url)
    .then((data) => ({ service: name, status: SERVICE_STATUS.READY, data }))
    .catch((err) => {
      if (!(err instanceof HttpRequestError)) throw err;
      const { type } = err;
      console.log('ERROR:', type, url);
      if (type === REQUEST_ERROR_TYPE.NETWORK_ERROR) {
        return { service: name, status: SERVICE_STATUS.NOT_AVAILABLE, data: null };
      }
      return { service: name, status: SERVICE_STATUS.FAIL, data: null };
    });
}

module.exports = { getServiceHealth };
