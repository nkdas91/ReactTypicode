import { CHART_COLORS } from "../../constants/chart";
import type { ChartDataItem } from "../../types/ChartDataItem";

/**
 * Creates pie chart data representing liked and non-liked posts.
 *
 * Calculates the number of posts that have not been liked and returns
 * chart-ready data for visualization.
 *
 * @param {number} [totalPosts=0] - Total number of posts
 * @param {number} [totalLikedPosts=0] - Total number of liked posts
 * @returns {ChartDataItem[]} Pie chart data containing liked and non-liked counts
 */
export default function getLikedPostsPieData(
  totalPosts = 0,
  totalLikedPosts = 0,
): ChartDataItem[] {
  /**
   * Number of posts that have not been liked.
   */
  const notLikedCount = totalPosts - totalLikedPosts;

  return [
    {
      name: "Liked",
      value: totalLikedPosts,
      fill: CHART_COLORS.accent,
    },
    {
      name: "Not Liked",
      value: notLikedCount,
      fill: CHART_COLORS.primary,
    },
  ];
}
