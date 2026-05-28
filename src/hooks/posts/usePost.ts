import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import postService from "../../services/postService";
import type { Post } from "../../types/Post";

const usePost = (id: number | null) => {
  return useQuery<Post, Error>({
    queryKey: QUERY_KEYS.post(id ?? 0),
    queryFn: ({ signal }) => {
      if (id === null) {
        throw new Error("Post ID is required");
      }

      return postService.get(id, { signal });
    },

    // Only run query when a valid post ID exists
    enabled: id !== null,

    staleTime: DEFAULT_STALE_TIME,
  });
};

export default usePost;
