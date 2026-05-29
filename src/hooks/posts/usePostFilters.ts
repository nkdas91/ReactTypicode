import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";

export default function usePostFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const userId = searchParams.get("userId") ?? "";

  const query = searchParams.get("title_like") ?? "";

  const showFavourites = searchParams.get("showFavourites") === "true";

  const page = Number(searchParams.get("page") || DEFAULT_PAGE);

  const limit = Number(searchParams.get("limit") || DEFAULT_LIMIT);

  // Update URL query params safely.
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

  const setUserId = (id: string) => {
    updateParams({
      userId: id,
      page: DEFAULT_PAGE.toString(),
    });
  };

  const setShowFavourites = (showFavourites: boolean) => {
    updateParams({
      showFavourites: String(showFavourites),
      page: DEFAULT_PAGE.toString(),
    });
  };

  const setPage = (newPage: number) => {
    updateParams({
      page: newPage.toString(),
    });
  };

  const setLimit = (newLimit: string) => {
    updateParams({
      limit: newLimit,
      page: DEFAULT_PAGE.toString(),
    });
  };

  const setQuery = useCallback(
    (nextQuery: string) => {
      const isQueryChanged = nextQuery !== query;

      updateParams({
        title_like: nextQuery,

        // Only reset pagination when query actually changes
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
