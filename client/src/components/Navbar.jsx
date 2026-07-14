import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useUserBasic } from "../hooks/useUserBasic";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useUserBasic();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`w-full z-50 ${isHome ? "bg-background/10 backdrop-blur-sm py-2 fixed top-0 right-0" : "bg-zinc-800 h-10 static top-0 right-0"}`}
    >
      <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex-shrink">
          <h1 className="text-2xl font-poppins font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-blue-400">
            <Link to="/"> &lt;CodeEva/&gt; </Link>
          </h1>
        </div>
        {!isLoggedIn ? (
          <>
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>{" "}
          </>
        ) : (
          <ProfileMenu isHome={isHome} />
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-dark animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="nav-link-active block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="/"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </a>
            <a
              href="/"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
            >
              Docs
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0"></div>
              <div className="ml-3 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium nav-link"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
