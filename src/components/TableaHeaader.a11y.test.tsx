import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import TableHeader from "./TableHeader";

describe("TableHeader accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <TableHeader
        searchQuery=""
        onSearch={() => {}}
        limit={10}
        onLimitChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations with existing search value", async () => {
    const { container } = render(
      <TableHeader
        searchQuery="john"
        onSearch={() => {}}
        limit={20}
        onLimitChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
