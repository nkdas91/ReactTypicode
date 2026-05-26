import { useQuery } from "@tanstack/react-query";
import commentService from "../../services/commentService";

export default function useComments(id: number) {
  return useQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: () => commentService.getByPost(id),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
}
