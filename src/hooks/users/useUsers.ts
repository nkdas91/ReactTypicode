import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { ApiError } from "../../errors/ApiError";
import userService from "../../services/userService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { User } from "../../types/User";

/**
 * Props for the useUsers hook.
 */
interface UseUsersProps {
  /**
   * Current page number for pagination.
   */
  page?: number;

  /**
   * Number of items per page.
   */
  limit?: number;

  /**
   * Search query for filtering users by name.
   */
  query?: string;
}

/**
 * Custom hook to fetch paginated and searchable users list using React Query.
 *
 * Supports:
 * - pagination
 * - name search filtering
 * - cached query key separation
 * - pagination cache preservation
 *
 * @param {UseUsersProps} [props] - Query configuration options
 * @returns {import("@tanstack/react-query").UseQueryResult<APIListResponse<User>, ApiError>} React Query result containing users data, loading, and error states
 */
const useUsers = ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  query,
}: UseUsersProps = {}) => {
  /**
   * Determines whether search mode is active.
   */
  const isSearching = Boolean(query?.trim());

  /**
   * Query parameters sent to the API.
   */
  interface UserQueryParams {
    _page: number;
    _limit: number;
    name_like?: string;
  }

  const params: UserQueryParams = {
    _page: page,
    _limit: limit,

    ...(isSearching ? { name_like: query } : {}),
  };

  return useQuery<APIListResponse<User>, ApiError>({
    queryKey: isSearching
      ? QUERY_KEYS.usersSearch(page, limit, query)
      : QUERY_KEYS.users(page, limit),

    /**
     * Fetch function for retrieving users list.
     *
     * @param {object} param0 - React Query context
     * @param {AbortSignal} param0.signal - Abort signal for request cancellation
     * @returns {Promise<APIListResponse<User>>} Paginated users response
     */
    queryFn: ({ signal }) =>
      userService.getAll({
        params,
        signal,
      }),

    /**
     * Keeps previous page data while fetching new page (better UX).
     */
    placeholderData: keepPreviousData,
  });
};

export default useUsers;
