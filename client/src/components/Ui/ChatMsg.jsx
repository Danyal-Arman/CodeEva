const ChatMsg = ({
  who,
  color,
  me = false,
  children,
}) => {
  return (
    <div
      className={`flex ${
        me ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-lg px-2 py-1.5 ${
          me
            ? "bg-violet/15 ring-1 ring-violet/20"
            : "bg-white/[0.04] ring-1 ring-white/5"
        }`}
      >
        <div
          className="text-[10px]"
          style={{ color }}
        >
          {who}
        </div>

        <div className="text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatMsg;