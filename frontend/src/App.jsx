import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./pages/Input";
import Dashboard from "./pages/Dashboard";
import { SignedIn, SignedOut, SignInButton, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <Navbar />

      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected route: Only visible if SignedIn */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />

        {/* Redirect if not signed in */}
        <Route
          path="/dashboard"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
