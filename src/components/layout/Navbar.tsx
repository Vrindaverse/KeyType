// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Play Now", "Join Us", "Leaderboard"];

  return (
    <nav className="w-full mt-7 top-4 left-0 flex justify-center z-50">
      {/* Container */}
      <div className="max-w-6xl w-full bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg border-2 border-black px-6 md:px-12 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-passero font-bold flex-shrink-0">
          KeyType
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 ml-auto">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={`/${item.toLowerCase().replace(/\s/g, "")}`}
              className="relative font-patrick text-black py-1 after:block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(true)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l-2 border-black z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col gap-6 mt-4 px-6">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={`/${item.toLowerCase().replace(/\s/g, "")}`}
              onClick={() => setIsOpen(false)}
              className="font-patrick text-lg text-black hover:underline transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
