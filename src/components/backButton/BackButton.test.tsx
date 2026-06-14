import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BackButton from "./BackButton";

describe("BackButton", () => {
  it("renders link with correct label", () => {
    render(
      <MemoryRouter>
        <BackButton url="/users" label="Back to Users" />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: /back to users/i,
    });

    expect(link).toBeInTheDocument();
  });

  it("has correct href", () => {
    render(
      <MemoryRouter>
        <BackButton url="/users" label="Back to Users" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/users");
  });

  it("renders icon and label together", () => {
    render(
      <MemoryRouter>
        <BackButton url="/users" label="Back to Users" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Back to Users")).toBeInTheDocument();
  });
});
