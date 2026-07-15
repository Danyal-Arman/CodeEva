import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const GhostButton = ({
  children,
  to,
  onClick,
  type = "button",
  disabled = false,
  icon = true,
  className = "",
}) => {
  const classes = `
    group inline-flex items-center justify-center gap-2
    rounded-xl
    border border-white/10
    bg-white/[0.03]
    px-5 py-3
    text-[15px]
    font-medium
    text-foreground
    transition-all duration-300
    hover:border-white/20
    hover:bg-white/[0.06]
    active:scale-[0.98]
    disabled:pointer-events-none
    disabled:opacity-60
    ${className}
  `;

  const content = (
    <>
      {icon && (
        <Play
          className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:scale-110"
        />
      )}

      <span>{children}</span>
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

export default GhostButton;