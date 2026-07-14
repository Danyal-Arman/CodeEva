import { useEffect, useState } from "react";
import {
  ArrowRight,
  Command,
  Send,
  Sparkles,
} from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

const AiShowcase = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2200);

    return () => clearInterval(id);
  }, []);

  const messages = [
    {
      role: "you",
      text: "Explain this algorithm.",
    },
    {
      role: "ai",
      text: "You're doing a nested scan — that's O(n²). A hash map turns the inner search into O(1).",
    },
    {
      role: "ai",
      text: "Time: O(n) · Space: O(n) · trades memory for a linear pass.",
    },
    {
      role: "ai",
      text: "Optimized: one pass, storing complements as you go. Want me to sketch it?",
      cta: true,
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-14 text-center">
        <SectionEyebrow>AI assistant</SectionEyebrow>

        <h2 className="text-gradient mx-auto mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          Meet{" "}
          <span className="text-gradient-violet font-display italic font-normal">
            Eva.
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
          She reads the room, understands your code, and coaches — she never
          solves.
        </p>
      </div>

      <div className="relative animate-float-slow">
        <div className="absolute inset-x-10 -inset-y-8 rounded-3xl bg-[radial-gradient(ellipse_at_center,oklch(0.68_0.14_165/0.25),transparent_70%)] blur-2xl" />

        <div className="glass-strong relative overflow-hidden rounded-3xl p-6 shadow-[0_40px_100px_-30px_oklch(0.55_0.14_165/0.5)] sm:p-8">
          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet to-[oklch(0.5_0.14_165)] shadow-[0_0_24px_oklch(0.68_0.14_165/0.5)]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <div className="text-[14.5px] font-medium">
                  Eva · AI Assistant
                </div>

                <div className="text-[11.5px] text-muted-foreground">
                  Analyzing two-sum.ts · 42 lines
                </div>
              </div>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-violet" />
              Live
            </span>
          </div>

          {/* Messages */}

          <div className="mt-6 space-y-3">
            {messages.slice(0, step + 1).map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "you"
                    ? "justify-end"
                    : "justify-start"
                } animate-fade-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] ${
                    message.role === "you"
                      ? "bg-white/[0.05] ring-1 ring-white/10"
                      : "bg-violet/10 ring-1 ring-violet/20"
                  }`}
                >
                  {message.text}

                  {message.cta && (
                    <button className="ml-2 inline-flex items-center gap-1 rounded-md bg-violet px-2 py-0.5 text-[11.5px] text-white">
                      Sketch
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {step < messages.length - 1 && (
              <div className="flex items-center gap-1 px-1 text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-violet" />

                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-violet [animation-delay:150ms]" />

                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-violet [animation-delay:300ms]" />
              </div>
            )}
          </div>

          {/* Input */}

          <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2">
            <Command className="ml-1 h-4 w-4 text-muted-foreground" />

            <input
              readOnly
              placeholder="Ask Eva anything…"
              className="w-full bg-transparent px-1 py-1.5 text-[13.5px] outline-none placeholder:text-muted-foreground"
            />

            <button className="grid h-8 w-8 place-items-center rounded-lg bg-violet text-white shadow-[0_0_16px_oklch(0.68_0.14_165/0.5)]">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiShowcase;