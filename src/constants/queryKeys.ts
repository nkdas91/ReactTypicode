export const QUERY_KEYS = {
  users: ["users"] as const,
  usersSearch: (query?: string) => ["users-search", query],

  posts: (page: number, limit: number, userId?: string) =>
    ["posts", page, limit, userId] as const,

  postsSearch: (query?: string, userId?: string) => [
    "posts-search",
    query,
    userId,
  ],

  comments: (postId: number) => ["posts", postId, "comments"] as const,

  user: (id: number) => ["users", id] as const,

  post: (id: number) => ["posts", id] as const,
};
