import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="px-5 py-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">404 - Page Not Found</h2>
      <p>
        Looks like the page you're trying to access doesn't exist. Please check
        the URL or{" "}
        <Link to="/" className="underline underline-offset-2">
          return to the homepage
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
