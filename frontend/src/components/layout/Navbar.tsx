import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [profileOpen, setProfileOpen] = useState(false); // profile panel
  const [user, setUser] = useState<{ username: string; avatarUrl?: string } | null>(null);

  const navItems = ["Play Now", "Join Us", "Leaderboard"];

  useEffect(() => {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatarUrl");
    if (username) setUser({ username, avatarUrl: avatar || undefined });
  }, []);

  const showAuthButton = !user && location.pathname !== "/auth";

  return (
    <nav className="w-full mt-7 top-4 left-0 flex justify-center z-50">
      <div className="max-w-6xl w-full bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.35)] rounded-lg border-2 border-black px-6 md:px-12 py-3 flex justify-between items-center transition-shadow">

        {/* Logo */}
        <Link to="/" className="text-2xl font-passero font-bold flex-shrink-0">
          KeyType
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 ml-auto items-center">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={`/${item.toLowerCase().replace(/\s/g, "")}`}
              className="relative font-patrick text-black py-1 after:block after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}

          {/* User Section */}
          {user ? (
            <div className="relative ml-4">
              <img
                src={user.avatarUrl || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-black shadow hover:shadow-lg transition"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black rounded-lg shadow-lg flex flex-col py-2 z-50">
                  <span className="px-4 py-2 font-bold">{user.username}</span>
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="px-4 py-2 text-left hover:bg-gray-100 transition"
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                      setProfileOpen(false);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            showAuthButton && (
              <Link
                to="/auth"
                className="px-5 py-2 font-bold text-black border-2 border-black rounded-xl shadow hover:shadow-lg hover:bg-black hover:text-white transition"
              >
                Login / Sign Up
              </Link>
            )
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          {user ? (
            <img
              src={user.avatarUrl || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-black shadow hover:shadow-lg transition"
              onClick={() => setProfileOpen(!profileOpen)}
            />
          ) : (
            showAuthButton && (
              <Link
                to="/auth"
                className="px-3 py-2 border-2 border-black rounded-lg text-black shadow hover:shadow-lg hover:bg-black hover:text-white transition"
              >
                Auth
              </Link>
            )
          )}

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

          {!user && showAuthButton && (
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border-2 border-black rounded-lg text-center text-black shadow hover:shadow-lg hover:bg-black hover:text-white transition"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
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
