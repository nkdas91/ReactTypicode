import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { ApiError } from "../../errors/ApiError";
import postService from "../../services/postService";
import type { Post } from "../../types/Post";

/**
 * Custom hook to fetch a single post by ID using React Query.
 *
 * Handles caching, background refetching, and request cancellation.
 *
 * @param {number | null} id - ID of the post to fetch. If null, the query is disabled.
 * @returns {import("@tanstack/react-query").UseQueryResult<Post, ApiError>} React Query result containing post data, loading, and error states
 */
const usePost = (id: number | null) => {
  return useQuery<Post, ApiError>({
    queryKey: QUERY_KEYS.post(id ?? 0),

    /**
     * Fetch function for retrieving a single post.
     *
     * @param {object} param0 - React Query context object
     * @param {AbortSignal} param0.signal - Abort signal for cancelling the request
     * @returns {Promise<Post>} The fetched post data
     */
    queryFn: ({ signal }) => {
      if (id === null) {
        throw new Error("Post ID is required");
      }

      return postService.get(id, { signal });
    },

    /**
     * Prevents query execution when post ID is not available.
     */
    enabled: id !== null,
  });
};

export default usePost;
