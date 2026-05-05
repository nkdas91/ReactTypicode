import { useMemo } from "react";
import usePosts from "./usePosts";
import useUsers from "./useUsers";

export const usePostsWithUsers = (userId?: string | null) => {
  const { data: posts } = usePosts();
  const { data: users } = useUsers();

  const result = useMemo(() => {
    if (!posts || !users) return [];

    const userMap = users.reduce(
      (acc, u) => {
        acc[u.id] = u.name;
        return acc;
      },
      {} as Record<number, string>,
    );

    const filtered = userId
      ? posts.filter((p) => p.userId === Number(userId))
      : posts;

    return filtered.map((p) => ({
      ...p,
      name: userMap[p.userId] || "",
    }));
  }, [posts, users, userId]);

  return { data: result };
};
