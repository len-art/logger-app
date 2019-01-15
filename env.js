// eslint-disable-next-line no-console
console.warn('Using environment:', process.env.NEXT_ENV);

const DEVELOPMENT = {
  BACKEND_URL: 'http://api-dev.example.com',
};

const STAGING = {
  BACKEND_URL: 'http://api-staging.example.com',
};

const PRODUCTION = {
  BACKEND_URL: 'http://api.example.com',
};

module.exports = process.env.NEXT_ENV === 'production' ? PRODUCTION : process.env.NEXT_ENV === 'staging' ? STAGING : DEVELOPMENT;
