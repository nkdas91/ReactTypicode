import { useNavigate, useSearchParams } from "react-router-dom";

export default function usePostFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const userId = searchParams.get("userId") ?? "";

  const page = Number(searchParams.get("page") || 1);

  const limit = Number(searchParams.get("limit") || 5);

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
      page: "1",
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
      page: "1",
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
