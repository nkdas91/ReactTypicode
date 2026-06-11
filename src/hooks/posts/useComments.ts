import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import commentService from "../../services/commentService";

/**
 * Custom hook to fetch comments for a specific post.
 *
 * Uses React Query for caching, background updates, and request deduplication.
 *
 * @param {number} id - Post ID for which comments should be fetched
 * @returns {import("@tanstack/react-query").UseQueryResult} React Query result object containing comments data, loading, and error states
 */
export default function useComments(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comments(id),

    /**
     * Fetch function for retrieving comments of a post.
     *
     * @param {object} param0 - React Query context
     * @param {AbortSignal} param0.signal - Abort signal for cancelling request
     */
    queryFn: ({ signal }) => commentService.getByPost(id, { signal }),

    /**
     * Prevents the query from running if the post ID is invalid.
     */
    enabled: id > 0,

    /**
     * Time before data is considered stale.
     */
    staleTime: DEFAULT_STALE_TIME,
  });
}
