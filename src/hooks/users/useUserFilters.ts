import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useUserFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParams.get("name_like") ?? "";

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

  const setQuery = useCallback(
    (query: string) => {
      updateParams({
        name_like: query,
      });
    },
    [updateParams],
  );

  return {
    query,
    setQuery,
  };
}
