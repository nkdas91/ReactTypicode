import { CHART_COLORS } from "../../constants/chart";
import type { ChartDataItem } from "../../types/ChartDataItem";

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
