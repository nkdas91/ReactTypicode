import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

describe("Button accessibility", () => {
  it("has no accessibility violations (button)", async () => {
    const { container } = render(<Button>Click me</Button>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations (link)", async () => {
    const { container } = render(
      <MemoryRouter>
        <Button to="/home">Home</Button>
      </MemoryRouter>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
