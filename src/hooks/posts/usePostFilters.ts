import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";

/**
 * Custom hook for managing post list filters via URL search params.
 *
 * Provides:
 * - query filters (userId, title search, favourites)
 * - pagination (page, limit)
 * - URL-synced state updates
 *
 * Ensures all filter changes are reflected in the browser URL.
 *
 * @returns {{
 *   userId: string;
 *   page: number;
 *   limit: number;
 *   query: string;
 *   showFavourites: boolean;
 *   setUserId: (id: string) => void;
 *   setPage: (page: number) => void;
 *   setLimit: (limit: string) => void;
 *   setQuery: (query: string) => void;
 *   setShowFavourites: (value: boolean) => void;
 * }} Filter state and update functions
 */
export default function usePostFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Currently selected user ID filter.
   */
  const userId = searchParams.get("userId") ?? "";

  /**
   * Search query filter for post title.
   */
  const query = searchParams.get("title_like") ?? "";

  /**
   * Whether only favourite posts should be shown.
   */
  const showFavourites = searchParams.get("showFavourites") === "true";

  /**
   * Current page number (pagination).
   */
  const page = Number(searchParams.get("page") || DEFAULT_PAGE);

  /**
   * Items per page (pagination limit).
   */
  const limit = Number(searchParams.get("limit") || DEFAULT_LIMIT);

  /**
   * Updates URL query parameters safely.
   *
   * Removes keys with empty values and updates others.
   *
   * @param {Record<string, string>} paramsToUpdate - Key-value pairs to update in URL
   */
  const updateParams = useCallback(
    (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      navigate(`/posts?${params.toString()}`);
    },
    [searchParams, navigate],
  );

  /**
   * Sets user filter and resets pagination.
   *
   * @param {string} id - User ID
   */
  const setUserId = (id: string) => {
    updateParams({
      userId: id,
      page: DEFAULT_PAGE.toString(),
    });
  };

  /**
   * Toggles favourites filter and resets pagination.
   *
   * @param {boolean} value - Whether to show favourites only
   */
  const setShowFavourites = (value: boolean) => {
    updateParams({
      showFavourites: String(value),
      page: DEFAULT_PAGE.toString(),
    });
  };

  /**
   * Updates current page.
   *
   * @param {number} newPage - Page number
   */
  const setPage = (newPage: number) => {
    updateParams({
      page: newPage.toString(),
    });
  };

  /**
   * Updates pagination limit and resets page.
   *
   * @param {string} newLimit - Items per page
   */
  const setLimit = (newLimit: string) => {
    updateParams({
      limit: newLimit,
      page: DEFAULT_PAGE.toString(),
    });
  };

  /**
   * Updates search query and conditionally resets pagination.
   *
   * @param {string} nextQuery - New search query
   */
  const setQuery = useCallback(
    (nextQuery: string) => {
      const isQueryChanged = nextQuery !== query;

      updateParams({
        title_like: nextQuery,

        ...(isQueryChanged ? { page: DEFAULT_PAGE.toString() } : {}),
      });
    },
    [updateParams, query],
  );

  return {
    userId,
    page,
    limit,
    query,
    showFavourites,
    setUserId,
    setPage,
    setLimit,
    setQuery,
    setShowFavourites,
  };
}
