import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Left side: Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
      >
        Minify
      </Link>

      {/* Right side: Nav links + Auth */}
      <div className="flex items-center space-x-6">
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Dashboard
          </Link>
        </div>

        {/* Auth buttons */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
