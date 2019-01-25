import axios from 'axios'

import { API_VERSION, BACKEND_URL } from 'env'

export const fetchRandomFlower = async () => {
  try {
    const data = await axios({
      method: 'POST',
      url: `${BACKEND_URL}/api/${API_VERSION}/flowers/random`,
      responseType: 'json',
    })
    return data.json()
  } catch (err) {
    return err.response
  }
}
