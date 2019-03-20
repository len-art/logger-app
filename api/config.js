const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'

const config = {
  urlPrefix: backendUrl,
  baseURL: backendUrl,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
}

export default config
