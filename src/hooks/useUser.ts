import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";
import type { User } from "../types/User";

const useUser = (id: number | null) => {
  return useQuery<User, Error>({
    queryKey: ["users", id],
    queryFn: () => {
      return userService.get(id!);
    },
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
};

export default useUser;
