import { Link } from "react-router-dom";

interface NavbarProps {
  favouriteCount: number;
}

const Navbar = ({ favouriteCount }: NavbarProps) => {
  return (
    <nav className="relative bg-gray-100">
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 py-4">
        <Link
          to="/"
          aria-current="page"
          className="px-3 py-2 text-sm font-medium text-black"
        >
          Home
        </Link>

        <Link
          to="/users"
          aria-current="page"
          className="px-3 py-2 text-sm font-medium text-black"
        >
          Users
        </Link>

        <Link
          to="/posts"
          aria-current="page"
          className="px-3 py-2 text-sm font-medium text-black"
        >
          Posts
        </Link>

        <Link
          to="/posts/favourites"
          aria-current="page"
          className="px-3 py-2 text-sm font-medium text-black"
        >
          Favourite Posts{" "}
          <span className="inline-flex items-center rounded-md bg-indigo-700 px-2 p-1 text-xs font-medium text-white">
            {favouriteCount || 0}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
