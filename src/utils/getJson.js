const { get } = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

function getJson(url) {
  return get(url)
    .then((res) => {
      const { headers, data } = res;
      const { 'content-type': contentType } = headers;
      if (!/^application\/json/.test(contentType)) {
        throw new HttpRequestError(REQUEST_ERROR_TYPE.RESPONSE_ERROR, 'Wron content-type');
      }
      if (typeof data === 'string') {
        throw new HttpRequestError(REQUEST_ERROR_TYPE.DATA_ERROR, 'Wron data format');
      }
      return data;
    })
    .catch((e) => {
      if (e instanceof HttpRequestError) throw e;
      if (e.response) throw new HttpRequestError(REQUEST_ERROR_TYPE.RESPONSE_ERROR, e.message);
      else if (e.request) throw new HttpRequestError(REQUEST_ERROR_TYPE.NETWORK_ERROR, e.message);
      throw e;
    });
}

module.exports = { getJson };
