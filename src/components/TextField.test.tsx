import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import TextField from "./TextField";

describe("TextField accessibility", () => {
  it("has no accessibility violations for a standard input", async () => {
    const { container } = render(
      <TextField label="Name" name="name" value="" onChange={() => {}} />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when showing an error", async () => {
    const { container } = render(
      <TextField
        label="Email"
        name="email"
        value=""
        error="Email is required"
        onChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations for textarea mode", async () => {
    const { container } = render(
      <TextField
        label="Comment"
        name="comment"
        as="textarea"
        value=""
        onChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
