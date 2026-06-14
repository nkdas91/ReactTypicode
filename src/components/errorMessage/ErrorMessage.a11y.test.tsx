import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <ErrorMessage message="Something went wrong" />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
