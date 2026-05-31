import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";

export default function useUserFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParams.get("name_like") ?? "";

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

      navigate(`/users?${params.toString()}`);
    },
    [searchParams, navigate],
  );

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
