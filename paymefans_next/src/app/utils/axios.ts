import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_URL,
});

export default axiosServer;
