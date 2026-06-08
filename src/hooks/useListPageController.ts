import { useEffect, useState } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";

interface UseListPageControllerProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function useListPageController({
  query,
  setQuery,
}: UseListPageControllerProps) {
  const [searchInput, setSearchInput] = useState(query);

  const debouncedSearch = useDebouncedValue(searchInput);

  // sync debounced search → global query
  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch, setQuery]);

  const handleSearch = (_: string, value: string) => {
    setSearchInput(value);
  };

  return {
    searchInput,
    setSearchInput,
    handleSearch,
  };
}
