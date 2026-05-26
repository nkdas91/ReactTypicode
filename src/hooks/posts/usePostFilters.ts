import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";

export default function usePostFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const userId = searchParams.get("userId") ?? "";

  const page = Number(searchParams.get("page") || DEFAULT_PAGE);

  const limit = Number(searchParams.get("limit") || DEFAULT_LIMIT);

  const updateParams = (paramsToUpdate: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

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

  return {
    userId,
    page,
    limit,
    setUserId,
    setPage,
    setLimit,
  };
}
