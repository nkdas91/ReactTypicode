import { useNavigate, useSearchParams } from "react-router-dom";

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";

export default function usePostFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const userId = searchParams.get("userId") ?? "";

  const query = searchParams.get("title_like") ?? "";

  // Ignore pagination params while searching
  const isSearching = Boolean(query.trim());

  const page = isSearching
    ? DEFAULT_PAGE
    : Number(searchParams.get("page") || DEFAULT_PAGE);

  const limit = isSearching
    ? DEFAULT_LIMIT
    : Number(searchParams.get("limit") || DEFAULT_LIMIT);

  const updateParams = (paramsToUpdate: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Remove pagination params while searching
    if (params.get("title_like")) {
      params.delete("page");
      params.delete("limit");
    }

    navigate(`/posts?${params.toString()}`);
  };

  const setUserId = (id: string) => {
    updateParams({
      userId: id,
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

  const setQuery = (query: string) => {
    updateParams({
      title_like: query,
    });
  };

  return {
    userId,
    page,
    limit,
    query,
    setUserId,
    setPage,
    setLimit,
    setQuery,
  };
}
