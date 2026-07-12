import { Monitor, Moon, Sun } from "lucide-react";
// import { useTheme } from "@/lib/theme";

const options = [
  {
    value: "light",
    label: "Light",
    Icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    Icon: Moon,
  },
  {
    value: "system",
    label: "System",
    Icon: Monitor,
  },
];

const ThemeToggle = () => {
//   const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className="glass relative hidden items-center gap-0.5 rounded-full p-0.5 sm:inline-flex"
    >
      {options.map(({ value, label, Icon }) => {
        const active = value;

        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            // onClick={() => setMode(value)}
            className={`relative grid h-7 w-7 place-items-center rounded-full transition-colors duration-200 ${
              active
                ? "bg-violet text-white shadow-[0_0_14px_var(--emerald-glow)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;