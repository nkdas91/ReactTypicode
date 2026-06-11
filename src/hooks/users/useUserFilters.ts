import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";

/**
 * Custom hook for managing user list filters via URL search params.
 *
 * Provides:
 * - pagination (page, limit)
 * - search query filtering
 * - URL-synced state updates
 *
 * Ensures all filter changes are reflected in the browser URL.
 *
 * @returns {{
 *   page: number;
 *   limit: number;
 *   query: string;
 *   setPage: (page: number) => void;
 *   setLimit: (limit: string) => void;
 *   setQuery: (query: string) => void;
 * }} User filter state and update functions
 */
export default function useUserFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Search query filter for user name.
   */
  const query = searchParams.get("name_like") ?? "";

  /**
   * Current page number for pagination.
   */
  const page = Number(searchParams.get("page") || DEFAULT_PAGE);

  /**
   * Number of items per page.
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

      navigate(`/users?${params.toString()}`);
    },
    [searchParams, navigate],
  );

  /**
   * Updates pagination page.
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
   * Updates search query filter.
   *
   * @param {string} query - User name search query
   */
  const setQuery = useCallback(
    (query: string) => {
      updateParams({
        name_like: query,
      });
    },
    [updateParams],
  );

  return {
    page,
    limit,
    query,
    setPage,
    setLimit,
    setQuery,
  };
}
