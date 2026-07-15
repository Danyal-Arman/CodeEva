import { Sparkles } from "lucide-react";

const AiVisual = () => {
  return (
    <div className="glass-strong rounded-2xl p-5">

      <div className="mb-3 flex items-center gap-2">

        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-[oklch(0.5_0.14_165)] shadow-[0_0_20px_oklch(0.68_0.14_165/0.5)]">
          <Sparkles className="h-4 w-4 text-white"/>
        </div>

        <div>
          <div className="text-[13px] font-medium">
            Eva
          </div>

          <div className="text-[11px] text-muted-foreground">
            AI Assistant
          </div>
        </div>

      </div>

      <div className="space-y-2 text-[13px]">

        <div className="rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/5">
          <span className="text-muted-foreground">
            You:
          </span>{" "}
          Explain this algorithm.
        </div>

        <div className="rounded-lg bg-violet/10 p-3 ring-1 ring-violet/20">
          <span className="text-violet">
            Eva:
          </span>{" "}
          Use a{" "}
          <span className="rounded bg-violet/20 px-1 text-violet">
            hash map
          </span>{" "}
          to reduce complexity from O(n²) to O(n).
        </div>

      </div>

    </div>
  );
};

export default AiVisual;