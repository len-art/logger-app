import axios from 'axios'

import config from './config'

const client = axios.create({
  baseURL: config.backendUrl,
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'} TODO: when app gets a token, add it to axios
})

client.defaults.headers.post['Content-type'] = 'application/json'

export default client
