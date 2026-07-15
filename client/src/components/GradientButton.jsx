import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GradientButton = ({
  children,
  size = "sm",
  icon = true,
  to,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  const classes = `
    group relative inline-flex items-center justify-center gap-2
    overflow-hidden rounded-xl
    bg-gradient-to-b
    from-[oklch(0.75_0.14_165)]
    to-[oklch(0.55_0.14_165)]
    font-medium
    text-white
    shadow-[0_1px_0_0_oklch(1_0_0/0.3)_inset,0_10px_30px_-10px_oklch(0.68_0.14_165/0.7)]
    transition-all duration-300
    hover:shadow-[0_1px_0_0_oklch(1_0_0/0.3)_inset,0_16px_40px_-8px_oklch(0.68_0.14_165/0.8)]
    active:scale-[0.98]
    disabled:pointer-events-none
    disabled:opacity-60
    ${
      size === "lg"
        ? "px-6 py-3 text-[15px]"
        : "px-4 py-2 text-[13.5px]"
    }
    ${className}
  `;

  const content = (
    <>
      <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <span className="relative z-10">
        {children}
      </span>

      {icon && (
        <ArrowRight
          className={`relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 ${
            size === "lg"
              ? "h-4 w-4"
              : "h-3.5 w-3.5"
          }`}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

export default GradientButton;