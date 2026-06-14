import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

describe("Button", () => {
  it("renders button by default", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as link when 'to' is provided", () => {
    render(
      <MemoryRouter>
        <Button to="/users">Go Users</Button>
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: "Go Users",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/users");
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="danger">Delete</Button>);

    expect(screen.getByRole("button")).toHaveClass("btn-danger");
  });

  it("applies size classes correctly", () => {
    render(<Button size="icon">Icon</Button>);

    expect(screen.getByRole("button")).toHaveClass("btn-icon");
  });

  it("passes type attribute correctly", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
