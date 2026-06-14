import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import NavbarLink from "./NavbarLink";

import type { NavbarItem } from "../../types/NavbarItem";

describe("NavbarLink", () => {
  const baseItem: NavbarItem = {
    label: "Home",
    to: "/",
  };

  it("renders link label", () => {
    render(
      <MemoryRouter>
        <NavbarLink
          item={baseItem}
          pathname="/"
          className="nav-link"
          activeClassName="active"
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toBeInTheDocument();
  });

  it("renders correct href", () => {
    render(
      <MemoryRouter>
        <NavbarLink
          item={{
            ...baseItem,
            to: "/about",
          }}
          pathname="/about"
          className="nav-link"
          activeClassName="active"
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  it("applies active class when item is active", () => {
    render(
      <MemoryRouter>
        <NavbarLink
          item={{
            ...baseItem,
            isActive: (pathname) => pathname === "/",
          }}
          pathname="/"
          className="nav-link"
          activeClassName="active"
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveClass("nav-link", "active");
  });

  it("does not apply active class when item is inactive", () => {
    render(
      <MemoryRouter>
        <NavbarLink
          item={{
            ...baseItem,
            isActive: (pathname) => pathname === "/about",
          }}
          pathname="/"
          className="nav-link"
          activeClassName="active"
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveClass("nav-link");

    expect(screen.getByRole("link")).not.toHaveClass("active");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(
      <MemoryRouter>
        <NavbarLink
          item={baseItem}
          pathname="/"
          className="nav-link"
          activeClassName="active"
          onClick={onClick}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
