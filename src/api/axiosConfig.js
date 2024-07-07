import axios from 'axios';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_WEBSERVER_URL || "http://localhost:3001" ,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    throw(error)
  }
);
export default axiosClient;
