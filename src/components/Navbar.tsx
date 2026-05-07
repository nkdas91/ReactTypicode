import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  favouriteCount: number;
}

const Navbar = ({ favouriteCount }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-100 px-7 py-4">
      <div className="mx-auto max-w-5xl flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          My App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-4">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/users" className="nav-link">
            Users
          </Link>
          <Link to="/posts" className="nav-link">
            Posts
          </Link>

          <Link
            to="/posts/favourites"
            className="nav-link flex items-center gap-2"
          >
            Favourite Posts
            <span className="inline-flex rounded-md bg-indigo-700 px-2 py-1 text-xs font-medium text-white">
              {favouriteCount || 0}
            </span>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-1"
        >
          <Bars3Icon className="size-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden mt-4 flex flex-col gap-2">
          <Link onClick={() => setOpen(false)} to="/" className="mobile-link">
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/users"
            className="mobile-link"
          >
            Users
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/posts"
            className="mobile-link"
          >
            Posts
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/posts/favourites"
            className="mobile-link flex justify-between"
          >
            Favourite Posts
            <span className="inline-flex rounded-md bg-indigo-700 px-2 py-1 text-xs font-medium text-white">
              {favouriteCount || 0}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
