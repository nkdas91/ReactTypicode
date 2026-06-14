import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";

import ChartContainer from "./ChartContainer";

describe("ChartContainer accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <ChartContainer title="Users Posts">
        <div>Chart content</div>
      </ChartContainer>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations during loading", async () => {
    const LazyChart = () => {
      throw new Promise(() => {});
    };

    const { container } = render(
      <ChartContainer title="Users Posts">
        <LazyChart />
      </ChartContainer>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
