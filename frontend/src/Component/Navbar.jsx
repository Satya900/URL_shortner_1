import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Left side: Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        Minify
      </Link>

      {/* Right side: Nav links + Theme toggle */}
      <div className="flex items-center space-x-6">
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
