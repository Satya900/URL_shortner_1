import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./pages/Input";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      {/* Add dark mode root class support */}
      <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
