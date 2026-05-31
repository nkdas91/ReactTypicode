import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { User } from "../../types/User";

interface UseUsersProps {
  page?: number;
  limit?: number;
  query?: string;
}

const useUsers = ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  query,
}: UseUsersProps = {}) => {
  const isSearching = Boolean(query?.trim());

  const params = {
    ...{ _page: page, _limit: limit },

    ...(isSearching ? { name_like: query } : {}),
  };
  return useQuery<APIListResponse<User>, Error>({
    queryKey: isSearching
      ? QUERY_KEYS.usersSearch(page, limit, query)
      : QUERY_KEYS.users(page, limit),

    queryFn: ({ signal }) => userService.getAll({ params, signal }),

    staleTime: DEFAULT_STALE_TIME,

    placeholderData: keepPreviousData,
  });
};

export default useUsers;
