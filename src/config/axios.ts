import axios, { AxiosError } from "axios";
import { API_TIMEOUT } from "../constants/api";
import { ApiError } from "../errors/ApiError";
import { API_BASE_URL } from "./env";

/**
 * Shared Axios instance used throughout the application.
 *
 * Configures:
 * - API base URL
 * - request timeout
 * - global response handling
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

/**
 * Global response interceptor.
 *
 * Responsibilities:
 * - preserve request cancellation behavior
 * - normalize timeout errors
 * - extract API error messages
 * - return consistent Error objects across the application
 */
axiosInstance.interceptors.response.use(
  /**
   * Returns successful responses unchanged.
   *
   * @param response - Axios response
   * @returns Original response
   */
  (response) => response,

  /**
   * Handles and normalizes API errors.
   *
   * @param {AxiosError} error - Axios error object
   * @returns {Promise<never>} Rejected promise containing a normalized Error
   */
  (error: AxiosError) => {
    /**
     * React Query and Axios use AbortController internally.
     *
     * Cancelled requests throw ERR_CANCELED.
     * Preserve the original error so React Query
     * can handle cancellation correctly.
     */
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

    /**
     * Convert timeout errors into a user-friendly message.
     */
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      return Promise.reject(
        new Error("The request timed out. Please try again."),
      );
    }

    /**
     * Extract the most meaningful error message.
     *
     * Fallback order:
     * 1. API response message
     * 2. Axios error message
     * 3. Generic fallback message
     */
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Something went wrong";

    /**
     * Normalize Axios errors into a structured ApiError instance.
     *
     * This ensures consistent error shape (message + status code)
     * across services, hooks, and React Query.
     */
    return Promise.reject(new ApiError(message, error.response?.status));
  },
);
