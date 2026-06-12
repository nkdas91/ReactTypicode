import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { ApiError } from "../../errors/ApiError";
import userService from "../../services/userService";
import type { User } from "../../types/User";

/**
 * Custom hook to fetch a single user by ID using React Query.
 *
 * Provides caching, request deduplication, and background refetching.
 *
 * @param {number | null} id - User ID to fetch. If null, query is disabled.
 * @returns {import("@tanstack/react-query").UseQueryResult<User, ApiError>} React Query result containing user data, loading, and error states
 */
const useUser = (id: number | null) => {
  return useQuery<User, ApiError>({
    queryKey: QUERY_KEYS.user(id ?? 0),

    /**
     * Fetch function for retrieving a single user.
     *
     * @param {object} param0 - React Query context
     * @param {AbortSignal} param0.signal - Abort signal for request cancellation
     * @returns {Promise<User>} Fetched user data
     */
    queryFn: ({ signal }) => {
      return userService.get(Number(id), { signal });
    },

    /**
     * Prevents query execution when user ID is not available.
     */
    enabled: id !== null,
  });
};

export default useUser;
