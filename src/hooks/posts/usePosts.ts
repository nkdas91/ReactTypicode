import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { ApiError } from "../../errors/ApiError";
import postService from "../../services/postService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { Post } from "../../types/Post";

/**
 * Props for the usePosts hook.
 */
interface UsePostsProps {
  /**
   * Current page number for pagination.
   */
  page?: number;

  /**
   * Number of items per page.
   */
  limit?: number;

  /**
   * Filter posts by user ID.
   */
  userId?: string;

  /**
   * Search query for post title filtering.
   */
  query?: string;

  /**
   * Whether to show only favourite posts.
   */
  showFavourites?: boolean;

  /**
   * List of favourite post IDs.
   */
  favourites?: number[];
}

/**
 * Custom hook to fetch paginated and filterable posts using React Query.
 *
 * Supports:
 * - pagination
 * - user filtering
 * - text search
 * - favourites filtering
 * - cache-aware query keys
 *
 * @param {UsePostsProps} [props] - Query configuration options
 * @returns {import("@tanstack/react-query").UseQueryResult<APIListResponse<Post>, ApiError>} React Query result containing posts data, loading, and error states
 */
const usePosts = ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  userId,
  query,
  showFavourites,
  favourites,
}: UsePostsProps = {}) => {
  /**
   * Determines if search mode is active.
   */
  const isSearching = Boolean(query?.trim());

  /**
   * Query parameters sent to the API.
   */
  interface PostQueryParams {
    _page: number;
    _limit: number;
    userId?: string;
    title_like?: string;
    id?: number[];
    showFavourites?: boolean;
  }

  const params: PostQueryParams = {
    _page: page,
    _limit: limit,

    ...(userId ? { userId } : {}),

    ...(showFavourites ? { showFavourites } : {}),

    ...(showFavourites && favourites?.length ? { id: favourites } : {}),

    ...(isSearching ? { title_like: query } : {}),
  };

  return useQuery<APIListResponse<Post>, ApiError>({
    queryKey: isSearching
      ? QUERY_KEYS.postsSearch(
          page,
          limit,
          userId,
          query,
          showFavourites,
          favourites,
        )
      : QUERY_KEYS.posts(page, limit, userId, showFavourites, favourites),

    /**
     * Fetch function for retrieving posts list.
     *
     * @param {object} param0 - React Query context
     * @param {AbortSignal} param0.signal - Abort signal for cancelling request
     * @returns {Promise<APIListResponse<Post>>} Paginated posts response
     */
    queryFn: ({ signal }) =>
      postService.getAll({
        params,
        signal,
      }),

    /**
     * Keeps previous data while fetching new data (better UX for pagination).
     */
    placeholderData: keepPreviousData,
  });
};

export default usePosts;
