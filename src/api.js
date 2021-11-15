import axios from 'axios';
import { API_HOST } from '@/constants';
import { getAuthTokenFromLocalStorage } from '@/utils/authUtils';

const api = axios.create({
  baseURL: API_HOST,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.put['Content-Type'] = 'application/json';
api.defaults.headers.patch['Content-Type'] = 'application/json';

api.interceptors.request.use(
  (config) => {
    const authToken = getAuthTokenFromLocalStorage();

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
    if ([401, 403].includes(error.response?.status)) {
      window.location.href = '/login';
    }
  },
);

export default api;
