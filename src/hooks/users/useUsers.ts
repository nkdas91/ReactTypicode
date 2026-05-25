import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userService";
import type { User } from "../../types/User";

const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => {
      return userService.getAll();
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useUsers;
