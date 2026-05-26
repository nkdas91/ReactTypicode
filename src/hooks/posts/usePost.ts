import { useQuery } from "@tanstack/react-query";
import postService from "../../services/postService";
import type { Post } from "../../types/Post";

const usePost = (id: number | null) => {
  return useQuery<Post, Error>({
    queryKey: ["posts", id],
    queryFn: () => {
      return postService.get(id!);
    },
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
};

export default usePost;
