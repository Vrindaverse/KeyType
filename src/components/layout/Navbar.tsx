// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white border-b-2 border-dashed border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-passero font-bold">
          KeyType
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/test" className="font-patrick hover:text-gray-700 transition">
            Play Now
          </Link>
          <Link to="/signup" className="font-patrick hover:text-gray-700 transition">
            Join Us
          </Link>
          <Link to="/leaderboard" className="font-patrick hover:text-gray-700 transition">
            Leaderboard
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 border-t-2 border-dashed border-black">
          <Link to="/test" className="block font-patrick hover:text-gray-700 transition">
            Play Now
          </Link>
          <Link to="/signup" className="block font-patrick hover:text-gray-700 transition">
            Join Us
          </Link>
          <Link to="/leaderboard" className="block font-patrick hover:text-gray-700 transition">
            Leaderboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
