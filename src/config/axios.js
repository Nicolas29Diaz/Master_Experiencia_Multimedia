import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosClient;
