import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import UsersPostsBarChart from "./UsersPostsBarChart";

import type { ChartDataItem } from "../../types/ChartDataItem";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),

  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),

  CartesianGrid: () => <div data-testid="cartesian-grid" />,

  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis">{dataKey}</div>
  ),

  YAxis: () => <div data-testid="y-axis" />,

  Tooltip: () => <div data-testid="tooltip" />,

  Bar: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="bar">{dataKey}</div>
  ),
}));

describe("UsersPostsBarChart", () => {
  const data: ChartDataItem[] = [
    {
      fill: "#ffffff",
      name: "January",
      value: 10,
    },
    {
      fill: "#222222",
      name: "February",
      value: 20,
    },
  ];

  it("renders empty state when there is no data", () => {
    render(<UsersPostsBarChart data={[]} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders chart when data exists", () => {
    render(<UsersPostsBarChart data={data} />);

    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();

    expect(screen.getByTestId("bar")).toHaveTextContent("value");
  });

  it("renders chart components", () => {
    render(<UsersPostsBarChart data={data} />);

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();

    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();

    expect(screen.getByTestId("x-axis")).toHaveTextContent("name");

    expect(screen.getByTestId("y-axis")).toBeInTheDocument();

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });
});
