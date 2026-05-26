import { useMemo } from "react";
import { CHART_COLORS } from "../../constants/chart";
import type { PieDataItem } from "../../types/PieDataItem";
import type { Post } from "../../types/Post";

export default function useLikedPostsPieData(
  posts: Post[] = [],
  likedPostIds: number[] = [],
): PieDataItem[] {
  return useMemo(() => {
    const likedPostSet = new Set(likedPostIds);

    const totalPosts = posts.length;

    const likedCount = posts.filter((post) => likedPostSet.has(post.id)).length;

    const notLikedCount = totalPosts - likedCount;

    return [
      {
        name: "Liked",
        value: likedCount,
        fill: CHART_COLORS.likedPosts.liked,
      },
      {
        name: "Not Liked",
        value: notLikedCount,
        fill: CHART_COLORS.likedPosts.notLiked,
      },
    ];
  }, [posts, likedPostIds]);
}
