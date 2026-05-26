import { useQuery } from "@tanstack/react-query";
import postService from "../../services/postService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { Post } from "../../types/Post";

interface UsePostsProps {
  page?: number;
  limit?: number;
  userId?: string;
}

const usePosts = ({ page = 1, limit = 10, userId }: UsePostsProps = {}) => {
  return useQuery<APIListResponse<Post>, Error>({
    queryKey: ["posts", page, limit, userId],

    queryFn: () => {
      return postService.getAll({
        params: {
          _page: page,
          _limit: limit,
          ...(userId ? { userId } : {}),
        },
      });
    },

    staleTime: 1000 * 60 * 5,
  });
};

export default usePosts;
