import { useMemo } from "react";
import type { PieDataItem } from "../../types/PieDataItem";
import type { Post } from "../../types/Post";

const COLORS = ["#f6339a", "#432dd7"];

export const useLikedPostsPieData = (
  posts?: Post[],
  likedPostIds: number[] = [],
): PieDataItem[] => {
  return useMemo(() => {
    const totalPosts = posts?.length ?? 0;

    const likedCount =
      posts?.filter((post) => likedPostIds.includes(post.id)).length ?? 0;

    const notLikedCount = totalPosts - likedCount;

    return [
      {
        name: "Liked",
        value: likedCount,
        fill: COLORS[0],
      },
      {
        name: "Not Liked",
        value: notLikedCount,
        fill: COLORS[1],
      },
    ];
  }, [posts, likedPostIds]);
};
