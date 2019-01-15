import axios from 'axios';

const API_URL = 'http://www.example.com/api/v1/';

export const fetchExample = async () => {
  try {
    const data = await axios({
      method: 'POST',
      url: `${API_URL}/example`,
      responseType: 'json',
    });
    return data.json();
  } catch (err) {
    return err.response;
  }
};
