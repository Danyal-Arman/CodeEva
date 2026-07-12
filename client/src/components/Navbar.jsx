import React, { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useUserBasic } from "../hooks/useUserBasic";
import ProfileMenu from "./ProfileMenu";

// import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
// import GradientButton from "./GradientButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn } = useUserBasic();

  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass-strong flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-2 pl-2">
          {/* <Logo /> */}
          <span className="text-[15px] font-semibold tracking-tight">
            CodeEva
          </span>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
          >
            Home
          </Link>

          <a
            href="#features"
            className="rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#docs"
            className="rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
          >
            Docs
          </a>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href="https://github.com/Danyal-Arman/CodeEva"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground sm:flex"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {!isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <button className="rounded-lg px-4 py-2 text-sm transition hover:bg-white/5">
                    Sign In
                  </button>
                </Link>

                <Link to="/register">
                  {/* <GradientButton> */}
                    Get Started
                  {/* </GradientButton> */}
                </Link>
              </div>

              {/* Mobile Menu Button */}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden rounded-lg p-2 hover:bg-white/5"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          ) : (
            <ProfileMenu isHome={isHome} />
          )}
        </div>
      </nav>

      {/* Mobile Menu */}

      {isMenuOpen && !isLoggedIn && (
        <div className="absolute top-full mt-3 w-[calc(100%-2rem)] max-w-6xl rounded-2xl glass-strong p-4 sm:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-white/5"
            >
              Home
            </Link>

            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-white/5"
            >
              Features
            </a>

            <a
              href="#docs"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-white/5"
            >
              Docs
            </a>

            <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full rounded-lg px-4 py-2 hover:bg-white/5">
                  Sign In
                </button>
              </Link>

              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <GradientButton className="w-full">
                  Get Started
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;