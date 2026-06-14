import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "jest-axe";

import type { ChartDataItem } from "../../types/ChartDataItem";

import LikedPostsPieChart from "./LikedPostsPieChart";

describe("LikedPostsPieChart accessibility", () => {
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

  it("has no accessibility violations", async () => {
    const { container } = render(<LikedPostsPieChart data={data} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when empty", async () => {
    const { container } = render(<LikedPostsPieChart data={[]} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
