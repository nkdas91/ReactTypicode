import { useEffect, useState } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";

interface UseListPageControllerProps {
  /**
   * Current query value from parent/global state.
   */
  query: string;

  /**
   * Setter function to update the global query state.
   */
  setQuery: (value: string) => void;
}

/**
 * Custom hook that controls list page search behavior.
 *
 * It maintains a local search input state, applies debouncing,
 * and syncs the debounced value with the global query state.
 *
 * @param {UseListPageControllerProps} props - Hook input properties
 * @returns {{
 *   searchInput: string;
 *   setSearchInput: React.Dispatch<React.SetStateAction<string>>;
 *   handleSearch: (name: string, value: string) => void;
 * }} Controller state and handlers for the list page search UI
 */
export default function useListPageController({
  query,
  setQuery,
}: UseListPageControllerProps) {
  /**
   * Local input state for the search field.
   */
  const [searchInput, setSearchInput] = useState<string>(query);

  /**
   * Debounced version of the search input.
   */
  const debouncedSearch = useDebouncedValue<string>(searchInput);

  /**
   * Sync debounced search value with global query state.
   */
  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch, setQuery]);

  /**
   * Handles search input changes from UI components.
   *
   * @param {string} _ - Name/key of the input field (unused)
   * @param {string} value - New input value entered by user
   */
  const handleSearch = (_: string, value: string) => {
    setSearchInput(value);
  };

  return {
    searchInput,
    setSearchInput,
    handleSearch,
  };
}
