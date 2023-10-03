import axios from "axios";

const token = localStorage.getItem("access_token");
const config = axios.create({
  baseURL: process.env.BACKEND_URL,
});
config.defaults.headers.common["Authorization"] = `${token}`;

export default config;
