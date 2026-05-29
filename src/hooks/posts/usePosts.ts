import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  query?: string;
  showFavourites?: boolean;
  favourites?: number[];
}

const usePosts = ({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  userId,
  query,
  showFavourites,
  favourites,
}: UsePostsProps = {}) => {
  const isSearching = Boolean(query?.trim());

  const params = {
    ...{ _page: page, _limit: limit },

    ...(userId ? { userId } : {}),

    ...(showFavourites ? { showFavourites } : {}),

    ...(showFavourites && favourites?.length ? { id: favourites } : {}),

    ...(isSearching ? { title_like: query } : {}),
  };

  return useQuery<APIListResponse<Post>, Error>({
    queryKey: isSearching
      ? QUERY_KEYS.postsSearch(
          page,
          limit,
          userId,
          query,
          showFavourites,
          favourites,
        )
      : QUERY_KEYS.posts(page, limit, userId, showFavourites, favourites),

    queryFn: ({ signal }) =>
      postService.getAll({
        params,
        signal,
      }),

    staleTime: DEFAULT_STALE_TIME,

    placeholderData: keepPreviousData,
  });
};

export default usePosts;
