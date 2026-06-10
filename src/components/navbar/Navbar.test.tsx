import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );
}

describe("Navbar", () => {
  it("renders navigation links", () => {
    renderNavbar();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });

  it("renders skip to content link", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", {
        name: /skip to main content/i,
      }),
    ).toBeInTheDocument();
  });

  it("opens mobile menu when toggle button is clicked", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    expect(
      document.getElementById("mobile-navigation"),
    ).not.toBeInTheDocument();

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    expect(document.getElementById("mobile-navigation")).toBeInTheDocument();
  });

  it("closes mobile menu when toggle button is clicked twice", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    await user.click(menuButton);

    expect(document.getElementById("mobile-navigation")).toBeInTheDocument();

    await user.click(menuButton);

    expect(
      document.getElementById("mobile-navigation"),
    ).not.toBeInTheDocument();
  });

  it("closes mobile menu when a mobile link is clicked", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const menuButton = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const homeLinks = screen.getAllByRole("link", {
      name: "Home",
    });

    await user.click(homeLinks[homeLinks.length - 1]);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
