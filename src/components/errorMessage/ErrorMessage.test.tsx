import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message", () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders message inside alert role", () => {
    render(<ErrorMessage message="Failed to load data" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load data");
  });

  it("updates when message changes", () => {
    const { rerender } = render(<ErrorMessage message="First error" />);

    expect(screen.getByRole("alert")).toHaveTextContent("First error");

    rerender(<ErrorMessage message="Second error" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Second error");
  });
});
