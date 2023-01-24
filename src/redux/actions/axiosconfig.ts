import axios from "axios";

const token = localStorage.getItem("Token");
const config = axios.create({
  baseURL: process.env.BACKEND_URL,
});
config.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default config;
