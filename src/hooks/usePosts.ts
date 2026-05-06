import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import { apiClient } from "../services/apiService";
import useUsers from "./useUsers";

type Params = {
  _page?: number;
  _limit?: number;
  userId?: number;
};

export const usePosts = (
  userId?: string | null,
  page?: number | null,
  limit?: number | null,
) => {
  const [data, setData] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const { data: users } = useUsers();

  useEffect(() => {
    const params: Params = {
      ...(page && { _page: Number(page) }),
      ...(limit && { _limit: Number(limit) }),
      ...(userId && { userId: Number(userId) }),
    };

    apiClient
      .get(`/posts`, {
        params,
      })
      .then((res) => {
        setTotal(Number(res.headers["x-total-count"]) ?? 0);

        if (!users) {
          setData(res.data);
          return;
        }

        const userMap = users?.reduce(
          (acc, u) => {
            acc[u.id] = u.name;
            return acc;
          },
          {} as Record<number, string>,
        );

        const postsWithUsers = res.data.map((p: Post) => ({
          ...p,
          name: userMap[p.userId] || "",
        }));

        setData(postsWithUsers);
      });
  }, [userId, page, limit, users]);

  return { data, total };
};

export default usePosts;
