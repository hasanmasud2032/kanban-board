import axios from "axios";

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

AXIOS.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer ${localStorage.getItem('_token')}`
  return config;
});

export default AXIOS;
