import { Braces, Check, X } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

const Comparison = () => {
  const rows = [
    { l: "Interviewing alone", r: "Real, live pair sessions" },
    { l: "Copy-paste to run code", r: "In-browser, sandboxed execution" },
    { l: "Answers on Google", r: "Guided AI hints, not spoilers" },
    { l: "No feedback loop", r: "Scored reports after every session" },
    { l: "Static PDFs of problems", r: "Interactive rooms with test cases" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <div className="mb-16 max-w-2xl">
        <SectionEyebrow>Why CodeEva</SectionEyebrow>

        <h2 className="text-gradient mt-3 text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          The old way, and the{" "}
          <span className="text-gradient-violet font-display italic font-normal">
            better way.
          </span>
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Left */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="mb-6 flex items-center gap-2 text-muted-foreground">
            <X className="h-4 w-4" />

            <span className="text-[13px] font-medium uppercase tracking-widest">
              Traditional practice
            </span>
          </div>

          <ul className="space-y-3">
            {rows.map((row) => (
              <li
                key={row.l}
                className="flex items-start gap-3 rounded-lg px-3 py-2 text-[14px] text-muted-foreground"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                <span>{row.l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative rounded-2xl border border-violet/20 bg-gradient-to-b from-violet/[0.08] to-transparent p-6 ring-1 ring-violet/10">
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,oklch(0.68_0.14_165/0.15),transparent_60%)]" />

          <div className="relative">
            <div className="mb-6 flex items-center gap-2">
              <div className="grid h-6 w-6 place-items-center rounded-md bg-violet">
                <Braces className="h-3.5 w-3.5 text-white" />
              </div>

              <span className="text-[13px] font-medium uppercase tracking-widest text-violet">
                With CodeEva
              </span>
            </div>

            <ul className="space-y-3">
              {rows.map((row) => (
                <li
                  key={row.r}
                  className="flex items-start gap-3 rounded-lg bg-white/[0.02] px-3 py-2 text-[14px] text-foreground ring-1 ring-white/5"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" />

                  <span>{row.r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;