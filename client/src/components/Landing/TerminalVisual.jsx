const TerminalVisual = () => {
  return (
    <div className="glass-strong overflow-hidden rounded-2xl">

      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">

        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />

      </div>

      <div className="p-5 font-mono text-[12px]">

        <div className="text-muted-foreground">
          <span className="text-violet">
            →
          </span>{" "}
          codeeva run two-sum.js
        </div>

        <div className="text-muted-foreground">
          Compiling...
        </div>

        <div className="text-foreground">
          ✓ Passed 3/3 tests
        </div>

        <div>Output: [0,1]</div>

      </div>

    </div>
  );
};

export default TerminalVisual;