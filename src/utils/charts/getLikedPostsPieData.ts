import { CHART_COLORS } from "../../constants/chart";
import type { PieDataItem } from "../../types/PieDataItem";

export default function getLikedPostsPieData(
  totalPosts = 0,
  totalLikedPosts = 0,
): PieDataItem[] {
  const notLikedCount = totalPosts - totalLikedPosts;

  return [
    {
      name: "Liked",
      value: totalLikedPosts,
      fill: CHART_COLORS.likedPosts.liked,
    },
    {
      name: "Not Liked",
      value: notLikedCount,
      fill: CHART_COLORS.likedPosts.notLiked,
    },
  ];
}
