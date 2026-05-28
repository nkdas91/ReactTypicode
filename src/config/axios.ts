import axios, { AxiosError } from "axios";

import { API_TIMEOUT } from "../constants/api";
import { API_BASE_URL } from "./env";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

// Intercept every API response globally.
// This allows centralized error handling instead of
// repeating try/catch transformation logic everywhere.
axiosInstance.interceptors.response.use(
  // Successful responses are returned unchanged.
  (response) => response,

  (error: AxiosError) => {
    // React Query + Axios use AbortController internally
    // for request cancellation.
    //
    // When a request is cancelled, Axios throws an
    // ERR_CANCELED error.
    //
    // We preserve the original cancellation error so
    // React Query can handle it correctly without
    // treating it like a real application failure.
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    // Extract a meaningful API error message.
    //
    // Fallback order:
    // 1. API response message
    // 2. Axios error message
    // 3. Generic fallback message
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Something went wrong";

    // Normalize errors into standard Error objects
    // so the rest of the application receives
    // consistent error types.
    return Promise.reject(new Error(message));
  },
);
