const HOST = '127.0.0.1';
const PORT = 3004;
const BASE_URL = `http://${HOST}:${PORT}`;
const SERVICE_NAME = 'HEALTH SERVICE';

const SERVICES_INFO = [
  { name: 'video-service', url: 'http://localhost:3000/health' },
  { name: 'user-service', url: 'http://localhost:3001/health' },
  { name: 'subscription-service', url: 'http://localhost:3002/health' },
  { name: 'history-service', url: 'http://localhost:3003/health' },
];

const SERVICE_STATUS = {
  READY: 'ready',
  FAIL: 'fail',
  NOT_AVAILABLE: 'not_available',
};

module.exports = {
  PORT,
  BASE_URL,
  SERVICE_NAME,
  SERVICES_INFO,
  SERVICE_STATUS,
};
