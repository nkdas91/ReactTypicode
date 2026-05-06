import { useMemo } from "react";
import type { PieDataItem } from "../types/PieDataItem";
import type { Post } from "../types/Post";

export const useLikedPostsChart = (
  posts: Post[],
  favouritePosts: number[],
): PieDataItem[] => {
  return useMemo(() => {
    const totalPosts = posts.length;

    const likedCount = posts.filter((post) =>
      favouritePosts.includes(post.id),
    ).length;

    const COLORS = ["#f6339a", "#432dd7"];
    const notLikedCount = totalPosts - likedCount;

    return [
      {
        name: `Liked`,
        value: likedCount,
        fill: COLORS[0],
      },
      {
        name: `Not Liked`,
        value: notLikedCount,
        fill: COLORS[1],
      },
    ];
  }, [posts, favouritePosts]);
};
