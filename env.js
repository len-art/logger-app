// eslint-disable-next-line no-console
console.warn('Using environment:', process.env.NEXT_ENV);

const DEVELOPMENT = {
  SENTRY_PUBLIC_DSN: 'https://d4cdf929480c4b0c8267d2cc2b4f28b6@sentry.io/1372620',
  BACKEND_URL: 'flowrspot-api.herokuapp.com',
  API_VERSION: 'v1',
};

const STAGING = {
  SENTRY_PUBLIC_DSN: 'https://d4cdf929480c4b0c8267d2cc2b4f28b6@sentry.io/1372620',
  BACKEND_URL: 'flowrspot-api.herokuapp.com',
  API_VERSION: 'v1',
};

const PRODUCTION = {
  SENTRY_PUBLIC_DSN: 'https://d4cdf929480c4b0c8267d2cc2b4f28b6@sentry.io/1372620',
  BACKEND_URL: 'flowrspot-api.herokuapp.com',
  API_VERSION: 'v1',
};

module.exports = process.env.NEXT_ENV === 'production' ? PRODUCTION : process.env.NEXT_ENV === 'staging' ? STAGING : DEVELOPMENT;
