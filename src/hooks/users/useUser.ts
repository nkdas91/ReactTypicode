import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import userService from "../../services/userService";
import type { User } from "../../types/User";

const useUser = (id: number | null) => {
  return useQuery<User, Error>({
    queryKey: QUERY_KEYS.user(id ?? 0),
    queryFn: () => {
      if (id === null) {
        throw new Error("User ID is required");
      }

      return userService.get(id);
    },
    enabled: id !== null,
    staleTime: DEFAULT_STALE_TIME,
  });
};

export default useUser;
