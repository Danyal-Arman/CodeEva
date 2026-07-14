const SectionEyebrow = ({ children }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-violet">
      <span className="h-1 w-1 rounded-full bg-violet shadow-[0_0_8px_oklch(0.68_0.14_165)]" />
      {children}
    </div>
  );
};

export default SectionEyebrow;