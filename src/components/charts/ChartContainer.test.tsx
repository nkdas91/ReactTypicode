import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ChartContainer from "./ChartContainer";

describe("ChartContainer", () => {
  it("renders title", () => {
    render(
      <ChartContainer title="Users Posts">
        <div>Chart content</div>
      </ChartContainer>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Users Posts",
      }),
    ).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <ChartContainer title="Users Posts">
        <div>Chart content</div>
      </ChartContainer>,
    );

    expect(screen.getByText("Chart content")).toBeInTheDocument();
  });

  it("renders loading fallback while suspense is pending", () => {
    const LazyChart = () => {
      throw new Promise(() => {});
    };

    render(
      <ChartContainer title="Users Posts">
        <LazyChart />
      </ChartContainer>,
    );

    expect(screen.getByText("Loading chart...")).toBeInTheDocument();
  });
});
