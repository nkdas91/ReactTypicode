import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import Pagination from "./Pagination";

describe("Pagination accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Pagination
        totalRecords={100}
        currentPage={1}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations on last page", async () => {
    const { container } = render(
      <Pagination
        totalRecords={100}
        currentPage={10}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
