import { useNavigate, useSearchParams } from "react-router-dom";

export default function useUserFilters() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParams.get("name_like") ?? "";

  const updateParams = (paramsToUpdate: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    navigate(`/users?${params.toString()}`);
  };

  const setQuery = (query: string) => {
    updateParams({
      name_like: query,
    });
  };

  return {
    query,
    setQuery,
  };
}
