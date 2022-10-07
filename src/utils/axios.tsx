import axios from 'axios'

export const apiAxios = axios.create({
    baseURL: '',
    headers: {
    // Authorization
    }
  });
  
  apiAxios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.location.href = '/';
      }
    });