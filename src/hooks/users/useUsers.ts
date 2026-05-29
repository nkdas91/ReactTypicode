import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { User } from "../../types/User";

interface UseUsersProps {
  query?: string;
}

const useUsers = ({ query }: UseUsersProps = {}) => {
  const isSearching = Boolean(query?.trim());

  const params = {
    ...(isSearching ? { name_like: query } : {}),
  };
  return useQuery<APIListResponse<User>, Error>({
    queryKey: isSearching ? QUERY_KEYS.usersSearch(query) : QUERY_KEYS.users,

    queryFn: ({ signal }) => userService.getAll({ params, signal }),

    staleTime: DEFAULT_STALE_TIME,

    placeholderData: keepPreviousData,
  });
};

export default useUsers;
