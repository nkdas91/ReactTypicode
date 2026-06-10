import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import TextField from "./TextField";

describe("TextField", () => {
  it("renders label and input", () => {
    render(<TextField label="Name" name="name" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<TextField name="name" value="" onChange={() => {}} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders validation error", () => {
    render(
      <TextField
        label="Email"
        name="email"
        value=""
        error="Email is required"
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();

    const onChange = vi.fn();

    render(<TextField label="Name" name="name" value="" onChange={onChange} />);

    await user.type(screen.getByRole("textbox"), "John");

    expect(onChange).toHaveBeenCalled();
  });

  it("calls onBlur when input loses focus", async () => {
    const user = userEvent.setup();

    const onBlur = vi.fn();

    render(
      <TextField
        label="Name"
        name="name"
        value="John"
        onChange={() => {}}
        onBlur={onBlur}
      />,
    );

    const textbox = screen.getByRole("textbox");

    await user.click(textbox);
    await user.tab();

    expect(onBlur).toHaveBeenCalledWith("name", "John");
  });

  it("renders textarea mode", () => {
    render(
      <TextField
        label="Comment"
        name="comment"
        as="textarea"
        value=""
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

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
