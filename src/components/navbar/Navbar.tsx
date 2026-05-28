import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navbarItems } from "../../config/navigation";
import NavLink from "./NavbarLink";

interface NavbarProps {
  favouriteCount: number;
}

const activeClasses =
  "active-nav-link text-primary underline underline-offset-4";

const Navbar = ({ favouriteCount }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  return (
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
              favouriteCount={favouriteCount}
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
        >
          <Bars3Icon className="size-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-4 flex flex-col gap-2 sm:hidden">
          {navbarItems.map((item) => (
            <NavLink
              key={item.to}
              item={item}
              pathname={pathname}
              favouriteCount={favouriteCount}
              className="mobile-link flex items-center gap-1"
              activeClassName={activeClasses}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
