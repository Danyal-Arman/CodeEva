const Marquee = () => {
  const stack = [
    "React",
    "Node.js",
    "MongoDB",
    "Socket.IO",
    "Monaco",
    "Judge0",
    "OpenAI",
    "Tailwind",
    "TypeScript",
    "Redis",
    "Vite",
    "PostgreSQL",
  ];

  const items = [...stack, ...stack];

  return (
    <section className="border-y border-white/5 bg-white/[0.01] py-10">
      <p className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Powered by a modern realtime stack
      </p>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {items.map((tech, index) => (
            <span
              key={index}
              className="text-[18px] font-medium tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;