import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { ChartDataItem } from "../../types/ChartDataItem";

import LikedPostsPieChart from "./LikedPostsPieChart";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),

  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),

  Pie: ({
    data,
    dataKey,
    nameKey,
  }: {
    data: ChartDataItem[];
    dataKey: string;
    nameKey: string;
  }) => (
    <div data-testid="pie">
      {JSON.stringify(data)}
      {dataKey}
      {nameKey}
    </div>
  ),

  Tooltip: () => <div data-testid="tooltip" />,

  Legend: () => <div data-testid="legend" />,

  Sector: () => <div data-testid="sector" />,
}));

describe("LikedPostsPieChart", () => {
  const data: ChartDataItem[] = [
    {
      fill: "#ffffff",
      name: "Liked",
      value: 10,
    },
    {
      fill: "#333333",
      name: "Not Liked",
      value: 5,
    },
  ];

  it("renders empty state when there is no data", () => {
    render(<LikedPostsPieChart data={[]} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders pie chart when data exists", () => {
    render(<LikedPostsPieChart data={data} />);

    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();

    expect(screen.getByTestId("pie")).toBeInTheDocument();
  });

  it("passes correct chart configuration", () => {
    render(<LikedPostsPieChart data={data} />);

    const pie = screen.getByTestId("pie");

    expect(pie).toHaveTextContent("value");

    expect(pie).toHaveTextContent("name");

    expect(pie).toHaveTextContent("Liked");

    expect(pie).toHaveTextContent("Not Liked");
  });

  it("renders tooltip and legend", () => {
    render(<LikedPostsPieChart data={data} />);

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();

    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });
});
