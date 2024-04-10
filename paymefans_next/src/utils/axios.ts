import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_URL,  // Set your base URL here
  withCredentials: true, // Make sure to enable sending cookies with requests
});

export default axiosInstance;
