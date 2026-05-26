import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { User } from "../../types/User";

const useUsers = () => {
  return useQuery<APIListResponse<User>, Error>({
    queryKey: QUERY_KEYS.users,
    queryFn: userService.getAll,
    staleTime: DEFAULT_STALE_TIME,
  });
};

export default useUsers;
