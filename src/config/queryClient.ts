import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "../errors/ApiError";

/**
 * Default stale time for React Query caches.
 *
 * Data will be considered fresh for 5 minutes before being marked stale.
 * After this period, React Query may refetch data in the background.
 */
export const DEFAULT_STALE_TIME = 1000 * 60 * 5;

/**
 * Global React Query client instance.
 *
 * Configures default behavior for all queries in the application:
 * - retry logic for failed requests
 * - exponential backoff retry delays
 * - default stale time for caching
 *
 * This client is provided to the app via `QueryClientProvider`
 * and is used automatically by all `useQuery` hooks.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * Retry strategy for failed queries.
       *
       * - Retries up to 2 times for recoverable errors
       * - Does NOT retry client-side errors (4xx status codes)
       *
       * @param {number} failureCount - Number of failed attempts so far
       * @param {any} error - Error object returned from the query function
       * @returns {boolean} Whether the query should be retried
       */
      retry: (failureCount, error: unknown) => {
        const status = error instanceof ApiError ? error.status : undefined;

        // don't retry client errors
        if (status !== undefined && status >= 400 && status < 500) {
          return false;
        }

        return failureCount < 2;
      },

      /**
       * Delay between retry attempts using exponential backoff.
       *
       * Formula:
       * 1000ms * 2^attemptIndex, capped at 5000ms.
       *
       * @param {number} attemptIndex - Current retry attempt index (0-based)
       * @returns {number} Delay in milliseconds before next retry
       */
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),

      /**
       * Time (in milliseconds) before cached query data is considered stale.
       *
       * Stale data may be refetched depending on component usage and focus events.
       */
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});
