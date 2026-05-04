import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        <Link
          to="/"
          aria-current="page"
          className="px-3 py-2 text-sm font-medium text-black"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
