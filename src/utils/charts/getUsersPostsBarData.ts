import { CHART_COLORS } from "../../constants/chart";
import type { ChartDataItem } from "../../types/ChartDataItem";

/**
 * Creates chart data for comparing total posts and total users.
 *
 * Intended for use in a bar chart or similar comparison visualization.
 *
 * @param {number} [posts=0] - Total number of posts
 * @param {number} [users=0] - Total number of users
 * @returns {ChartDataItem[]} Chart data containing post and user counts
 */
export default function getUsersPostsBarData(
  posts = 0,
  users = 0,
): ChartDataItem[] {
  return [
    {
      name: "Posts",
      value: posts,
      fill: CHART_COLORS.accent,
    },
    {
      name: "Users",
      value: users,
      fill: CHART_COLORS.primary,
    },
  ];
}
