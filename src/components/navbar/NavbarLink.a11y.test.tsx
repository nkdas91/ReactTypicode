import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";

import NavbarLink from "./NavbarLink";

import type { NavbarItem } from "../../types/NavbarItem";

describe("NavbarLink accessibility", () => {
  const item: NavbarItem = {
    label: "Home",
    to: "/",
  };

  it("has no accessibility violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <NavbarLink
          item={item}
          pathname="/"
          className="nav-link"
          activeClassName="active"
        />
      </MemoryRouter>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
