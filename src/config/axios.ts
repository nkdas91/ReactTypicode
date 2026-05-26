import axios, { AxiosError } from "axios";
import { API_TIMEOUT } from "../constants/api";
import { API_BASE_URL } from "./env";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
