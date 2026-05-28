import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import commentService from "../../services/commentService";

export default function useComments(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comments(id),
    queryFn: ({ signal }) => commentService.getByPost(id, { signal }),

    // Only run query when a valid post ID exists
    enabled: id !== null,

    staleTime: DEFAULT_STALE_TIME,
  });
}
