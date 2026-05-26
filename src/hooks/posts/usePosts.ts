import { useQuery } from "@tanstack/react-query";
import { DEFAULT_STALE_TIME } from "../../config/queryClient";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../constants/pagination";
import { QUERY_KEYS } from "../../constants/queryKeys";
import postService from "../../services/postService";
import type { APIListResponse } from "../../types/APIListResponse";
import type { Post } from "../../types/Post";

interface UsePostsProps {
  page?: number;
  limit?: number;
  userId?: string;
}

const usePosts = ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  userId,
}: UsePostsProps = {}) => {
  const params = {
    _page: page,
    _limit: limit,
    ...(userId ? { userId } : {}),
  };

  return useQuery<APIListResponse<Post>, Error>({
    queryKey: QUERY_KEYS.posts(page, limit, userId),

    queryFn: () => {
      return postService.getAll({
        params,
      });
    },

    staleTime: DEFAULT_STALE_TIME,
  });
};

export default usePosts;
