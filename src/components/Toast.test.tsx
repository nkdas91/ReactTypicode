import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  it("renders success message", () => {
    render(<Toast message="User created" type="success" />);

    expect(screen.getByText("User created")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<Toast message="Failed to create user" type="error" />);

    expect(screen.getByText("Failed to create user")).toBeInTheDocument();
  });

  it("renders alert role", () => {
    render(<Toast message="Notification" type="success" />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders close button when onClose is provided", () => {
    const onClose = vi.fn();

    render(<Toast message="Notification" type="success" onClose={onClose} />);

    expect(
      screen.getByRole("button", {
        name: "Close notification",
      }),
    ).toBeInTheDocument();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<Toast message="Notification" type="success" />);

    expect(
      screen.queryByRole("button", {
        name: "Close notification",
      }),
    ).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();

    render(<Toast message="Notification" type="success" onClose={onClose} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close notification",
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies success styling", () => {
    render(<Toast message="Success" type="success" />);

    expect(screen.getByRole("alert")).toHaveClass("toast-success");
  });

  it("applies error styling", () => {
    render(<Toast message="Error" type="error" />);

    expect(screen.getByRole("alert")).toHaveClass("toast-error");
  });
});
