export const QUERY_KEYS = {
  users: ["users"] as const,
  usersSearch: (query?: string) => ["users-search", query],

  posts: (
    page: number,
    limit: number,
    userId?: string,
    showFavourites?: boolean,
    favourites?: number[],
  ) =>
    [
      "posts",
      page,
      limit,
      userId,
      showFavourites,
      favourites?.join(","),
    ] as const,

  postsSearch: (
    page: number,
    limit: number,
    userId?: string,
    query?: string,
    showFavourites?: boolean,
    favourites?: number[],
  ) =>
    [
      "posts-search",
      page,
      limit,
      userId,
      query,
      showFavourites,
      favourites?.join(","),
    ] as const,

  comments: (postId: number) => ["posts", postId, "comments"] as const,

  user: (id: number) => ["users", id] as const,

  post: (id: number) => ["posts", id] as const,
};
