const Footer = () => {
  return (
    <footer className="bg-slate-900 text-zinc-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">Codeva</h2>
          <p className="text-sm mt-1">AI-Powered real-time code collaboration</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="https://github.com/Danyal-Arman" className="hover:text-white transition">GitHub</a>
          <a href="https://www.linkedin.com/in/danyal-arman-849b29286" className="hover:text-white transition">LinkedIn</a>
          {/* <a href="#" className="hover:text-white transition">Portfolio</a> */}
        </div>

        {/* Credit */}
        <div className="text-sm text-center md:text-right">
          <p>Built by <span className="text-white">Danyal Arman</span></p>
          <p className="text-xs mt-1">© 2026 Codeva</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;