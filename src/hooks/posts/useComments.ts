import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import commentService from "../../services/commentService";

export default function useComments(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comments(id),
    queryFn: () => commentService.getByPost(id),
    enabled: id !== null,
    staleTime: DEFAULT_STALE_TIME,
  });
}
