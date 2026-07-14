import { Github } from "lucide-react";

// import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

          <div className="flex items-center gap-2">
            {/* <Logo /> */}

            <span className="text-[15px] font-semibold tracking-tight">
              CodeEva
            </span>

            <span className="ml-3 text-[12px] text-muted-foreground">
              © 2026 · Built for developers.
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-muted-foreground">

            <a
              href="#"
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a
              href="#"
              className="hover:text-foreground"
            >
              Documentation
            </a>

            <a
              href="#"
              className="hover:text-foreground"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-foreground"
            >
              Contact
            </a>

          </nav>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />

      <div className="py-6 text-center text-[11px] text-muted-foreground">
        Crafted with obsessive attention to detail.
      </div>
    </footer>
  );
};

export default Footer;