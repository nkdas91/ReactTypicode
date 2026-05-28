import axios, { AxiosError } from "axios";

import { API_TIMEOUT } from "../constants/api";
import { API_BASE_URL } from "./env";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

// Intercept every API response globally.
axiosInstance.interceptors.response.use(
  // Return successful responses unchanged.
  (response) => response,

  (error: AxiosError) => {
    // React Query + Axios use AbortController internally.
    //
    // Cancelled requests throw ERR_CANCELED.
    // Preserve the original error so React Query
    // can handle cancellation correctly.
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    // Handle request timeout errors with a
    // user-friendly message.
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      return Promise.reject(
        new Error("The request timed out. Please try again."),
      );
    }

    // Extract the most meaningful error message.
    //
    // Fallback order:
    // 1. API response message
    // 2. Axios error message
    // 3. Generic fallback message
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Something went wrong";

    // Normalize all errors into standard Error objects
    // for consistent handling across the app.
    return Promise.reject(new Error(message));
  },
);
