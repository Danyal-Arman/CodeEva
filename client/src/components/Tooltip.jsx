export const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group inline-flex">
      {children}
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 
                       opacity-0 group-hover:opacity-100
                       transition-all duration-200 z-50
                       bg-red-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};