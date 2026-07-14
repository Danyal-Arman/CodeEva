const Line = ({ n, numOverride, children }) => {
  return (
    <div className="flex gap-4">
      <span className="w-4 select-none text-right text-[10.5px] text-white/25">
        {numOverride ?? n}
      </span>

      <span>{children}</span>
    </div>
  );
};

export default Line;