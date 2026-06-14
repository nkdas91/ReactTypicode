import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import BackButton from "./BackButton";

describe("BackButton accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <BackButton url="/users" label="Back to Users" />
      </MemoryRouter>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
