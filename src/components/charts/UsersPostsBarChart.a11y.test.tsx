import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axe } from "jest-axe";

import UsersPostsBarChart from "./UsersPostsBarChart";

import type { ChartDataItem } from "../../types/ChartDataItem";

describe("UsersPostsBarChart accessibility", () => {
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

  it("has no accessibility violations", async () => {
    const { container } = render(<UsersPostsBarChart data={data} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when empty", async () => {
    const { container } = render(<UsersPostsBarChart data={[]} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
