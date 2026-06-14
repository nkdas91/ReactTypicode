import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Navbar from "./Navbar";

vi.mock("./NavbarLink", () => ({
  default: ({
    item,
    onClick,
  }: {
    item: {
      label: string;
    };
    onClick?: () => void;
  }) => (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
    >
      {item.label}
    </a>
  ),
}));

vi.mock("../../config/navigation", () => ({
  navbarItems: [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "About",
      to: "/about",
    },
  ],
}));

describe("Navbar", () => {
  it("renders brand link", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: "My App",
      }),
    ).toBeInTheDocument();
  });

  it("renders skip navigation link", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "About",
      }),
    ).toBeInTheDocument();
  });

  it("mobile menu button is initially closed", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", {
        name: "Toggle navigation menu",
      }),
    ).toHaveAttribute("aria-expanded", "false");

    expect(
      screen.queryByRole("region", {
        name: "mobile-navigation",
      }),
    ).not.toBeInTheDocument();
  });

  it("opens mobile menu when button is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");

    const mobileMenu = document.getElementById("mobile-navigation");

    expect(mobileMenu).toBeInTheDocument();

    expect(
      within(mobileMenu as HTMLElement).getByRole("link", {
        name: "Home",
      }),
    ).toBeInTheDocument();
  });

  it("closes mobile menu when a mobile link is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: "Toggle navigation menu",
    });

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");

    const mobileMenu = document.getElementById("mobile-navigation");

    expect(mobileMenu).toBeInTheDocument();

    fireEvent.click(
      within(mobileMenu as HTMLElement).getByRole("link", {
        name: "Home",
      }),
    );

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
