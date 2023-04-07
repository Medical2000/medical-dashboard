
import axios from 'axios';
import { TOKEN_KEY } from '../constants/appconstants';

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const ApiClient = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    'Content-type': 'application/json',
  },
});

ApiClient.interceptors.request.use(
  async (config: any) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: any = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };
    return Promise.reject(customError);
  },
);
export default ApiClient;
