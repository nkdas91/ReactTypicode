import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";
import type { User } from "../../types/User";

/**
 * Custom hook to fetch a single user by ID using React Query.
 *
 * Provides caching, request deduplication, and background refetching.
 *
 * @param {number | null} id - User ID to fetch. If null, query is disabled.
 * @returns {import("@tanstack/react-query").UseQueryResult<User, Error>} React Query result containing user data, loading, and error states
 */
const useUser = (id: number | null) => {
  return useQuery<User, Error>({
    queryKey: QUERY_KEYS.user(id ?? 0),

    /**
     * Fetch function for retrieving a single user.
     *
     * @param {object} param0 - React Query context
     * @param {AbortSignal} param0.signal - Abort signal for request cancellation
     * @returns {Promise<User>} Fetched user data
     */
    queryFn: ({ signal }) => {
      if (id === null) {
        throw new Error("User ID is required");
      }

      return userService.get(id, { signal });
    },

    /**
     * Prevents query execution when user ID is not available.
     */
    enabled: id !== null,

    /**
     * Time (in ms) before cached data is considered stale.
     */
    staleTime: DEFAULT_STALE_TIME,
  });
};

export default useUser;
