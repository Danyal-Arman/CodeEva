const AvatarStack = () => {
  const users = [
    {
      c: "oklch(0.68 0.14 165)",
      n: "Y",
    },
    {
      c: "oklch(0.7 0.2 150)",
      n: "P",
    },
    {
      c: "oklch(0.75 0.18 60)",
      n: "A",
    },
  ];

  return (
    <div className="flex items-center -space-x-1.5">
      {users.map((user, index) => (
        <div
          key={index}
          className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-black ring-2 ring-[oklch(0.13_0.03_265)]"
          style={{
            background: user.c,
          }}
        >
          {user.n}
        </div>
      ))}

      <div className="ml-2 hidden items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10.5px] text-muted-foreground sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.2_150)]" />

        3 live
      </div>
    </div>
  );
};

export default AvatarStack;