// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full flex justify-center py-8 bg-white">
      {/* Container Box */}
      <div className="max-w-6xl w-full bg-white rounded-lg border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.25)] px-8 py-8 flex flex-col md:flex-row justify-between gap-6">
        
        {/* Left Section: Newsletter */}
        <div className="flex-1 flex flex-col gap-3 md:gap-4">
          <h3 className="font-passero text-xl md:text-2xl">Subscribe to our Newsletter</h3>
          <p className="font-patrick text-gray-700 text-sm">
            Get updates on new features, competitions, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 mt-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 border-2 border-black rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.25)] w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white font-patrick rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Right Section: Logo + Links + Socials */}
        <div className="flex-1 flex flex-col md:items-end gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md
                            shadow-[4px_4px_0px_rgba(0,0,0,0.25)] font-bold">
              Logo
            </div>
            <span className="font-passero text-xl md:text-2xl">KeyType</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 text-right">
            {["Home", "Features", "Contact", "Leaderboard"].map((item, idx) => (
              <Link
                key={idx}
                to={`/${item.toLowerCase()}`}
                className="relative group font-patrick hover:text-gray-800 transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-1 justify-end">
            <Link to="https://github.com/yourusername" target="_blank" className="hover:scale-110 transition-transform">
              <Github size={22} />
            </Link>
            <Link to="https://linkedin.com/in/yourprofile" target="_blank" className="hover:scale-110 transition-transform">
              <Linkedin size={22} />
            </Link>
            <Link to="https://twitter.com/yourprofile" target="_blank" className="hover:scale-110 transition-transform">
              <Twitter size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
