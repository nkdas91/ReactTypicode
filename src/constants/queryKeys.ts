export const QUERY_KEYS = {
  users: ["users"] as const,

  posts: (page: number, limit: number, userId?: string) =>
    ["posts", page, limit, userId] as const,

  comments: (postId: number) => ["posts", postId, "comments"] as const,

  user: (id: number) => ["users", id] as const,

  post: (id: number) => ["posts", id] as const,
};
