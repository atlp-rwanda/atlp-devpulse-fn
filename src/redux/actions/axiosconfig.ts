import axios from "axios";

const token = localStorage.getItem("Token");
console.log(process.env.BACKEND_URL);
const config = axios.create({
  baseURL: process.env.BACKEND_URL,
});
config.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default config;
