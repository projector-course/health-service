const http = require('http');
const util = require('util');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

function request(url, callback) {
  http.get(url, (res) => {
    const { headers, statusCode } = res;
    const { 'content-type': contentType } = headers;

    let err;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      const message = `Request Failed: status code: ${statusCode}`;
      err = new HttpRequestError(REQUEST_ERROR_TYPE.RESPONSE_ERROR, message);
    } else if (!/^application\/json/.test(contentType)) {
      const message = `Invalid content-type: Expected application/json but received ${contentType}`;
      err = new HttpRequestError(REQUEST_ERROR_TYPE.RESPONSE_ERROR, message);
    }

    if (err) {
      console.error(err.message);
      // Consume response data to free up memory
      res.resume();
      callback(err, null);
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        callback(null, parsedData);
      } catch (e) {
        console.error(e.message);
        const error = new HttpRequestError(REQUEST_ERROR_TYPE.DATA_ERROR, e.message);
        callback(error, null);
      }
    });
  }).on('error', (e) => {
    console.error(e.message);
    const error = new HttpRequestError(REQUEST_ERROR_TYPE.NETWORK_ERROR, e.message);
    callback(error, null);
  });
}

const getHttpJson = util.promisify(request);

module.exports = { getHttpJson };
