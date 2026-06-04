import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navbarItems } from "../../config/navigation";
import NavLink from "./NavbarLink";

const activeClasses =
  "active-nav-link text-primary underline underline-offset-4";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      {/* Visible only when focused via keyboard */}
      <div className="pointer-events-none text-center">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only inline-block focus:m-2 pointer-events-auto text-primary outline-none underline underline-offset-2"
        >
          Skip to main content
        </a>
      </div>

      <nav className="bg-surface px-7 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" className="text-lg font-bold">
            My App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-4 sm:flex">
            {navbarItems.map((item) => (
              <NavLink
                key={item.to}
                item={item}
                pathname={pathname}
                className="nav-link flex items-center gap-1"
                activeClassName={activeClasses}
              />
            ))}
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setOpen((previousOpen) => !previousOpen)}
            className="flex flex-col gap-1 sm:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Bars3Icon className="size-8" />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            id="mobile-navigation"
            className="mt-4 flex flex-col gap-2 sm:hidden"
          >
            {navbarItems.map((item) => (
              <NavLink
                key={item.to}
                item={item}
                pathname={pathname}
                className="mobile-link flex items-center gap-1"
                activeClassName={activeClasses}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
