import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Toast from "./Toast";

describe("Toast accessibility", () => {
  it("has no accessibility violations for success toast", async () => {
    const { container } = render(
      <Toast message="User created successfully" type="success" />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations for error toast", async () => {
    const { container } = render(
      <Toast message="Failed to save user" type="error" />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations with close button", async () => {
    const { container } = render(
      <Toast message="Notification" type="success" onClose={() => {}} />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
