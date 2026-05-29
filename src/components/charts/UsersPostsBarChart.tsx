import type { BarShapeProps } from "recharts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDataItem } from "../../types/ChartDataItem";

interface UsersPostsBarChartProps {
  data: ChartDataItem[];
}

/**
 * Custom bar renderer to apply consistent color theme
 * similar to pie chart slices.
 */
const CustomBar = (props: BarShapeProps) => {
  const { x, y, width, height, fill } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />;
};

const UsersPostsBarChart = ({ data }: UsersPostsBarChartProps) => {
  if (!data.length) return <p>No data available</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          <Bar dataKey="value" shape={CustomBar} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersPostsBarChart;
