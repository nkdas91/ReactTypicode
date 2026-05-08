import type { PieLabelRenderProps, PieSectorShapeProps } from "recharts";
import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import type { PieDataItem } from "../../types/PieDataItem";

interface LikesPieChartProps {
  data: PieDataItem[];
}

const COLORS = ["#f6339a", "#432dd7"];
const RADIAN = Math.PI / 180;

const CustomPieSlice = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);

  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const LikesPieChart = ({ data }: LikesPieChartProps) => {
  if (!data.length) return <p>No data available</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            labelLine={false}
            label={renderLabel}
            shape={CustomPieSlice}
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LikesPieChart;
