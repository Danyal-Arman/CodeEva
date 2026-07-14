import { Circle } from "lucide-react";

const rows = [
  {
    user: "You",
    color: "oklch(0.68 0.14 165)",
    code: "const map = new Map();",
  },
  {
    user: "Priya",
    color: "oklch(0.7 0.2 150)",
    code: "for (let i = 0; i < nums.length; i++) {",
  },
  {
    user: "Alex",
    color: "oklch(0.75 0.18 60)",
    code: "const need = target - nums[i];",
  },
];

const CollabVisual = () => {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-4">
      <div className="grid gap-2 font-mono text-[12px]">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-md bg-white/[0.03] px-3 py-2 ring-1 ring-white/5"
          >
            <div
              className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold text-black"
              style={{ background: row.color }}
            >
              {row.user[0]}
            </div>

            <div
              className="text-muted-foreground"
              style={{ color: row.color }}
            >
              {row.user}
            </div>

            <div className="ml-auto flex-1 truncate text-right text-foreground/80">
              {row.code}
            </div>

            <div
              className="h-3 w-0.5 animate-blink"
              style={{ background: row.color }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-md bg-black/30 p-2 text-[11px] text-muted-foreground">
        <span>3 cursors · same file</span>

        <span className="flex items-center gap-1 text-[oklch(0.7_0.2_150)]">
          <Circle className="h-1.5 w-1.5 fill-current" />
          Synced 12ms
        </span>
      </div>
    </div>
  );
};

export default CollabVisual;