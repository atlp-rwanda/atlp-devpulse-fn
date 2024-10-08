import axios from "axios";

const config = axios.create({
  baseURL: process.env.BACKEND_URL,
});

config.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default config;
export function logout() {
  localStorage.removeItem("access_token");
}
