import {
  Layers,
  Users,
  MessageSquare,
  Sparkles,
  Play,
  Star,
} from "lucide-react";

import SectionEyebrow from "./SectionEyebrow";

const steps = [
  {
    title: "Create Room",
    description: "Spin up a private room in one click.",
    icon: Layers,
  },
  {
    title: "Invite Friend",
    description: "Share a room link. Anyone joins instantly.",
    icon: Users,
  },
  {
    title: "Collaborate",
    description: "Type together with live cursors and chat.",
    icon: MessageSquare,
  },
  {
    title: "AI Guidance",
    description: "Eva helps when you're stuck without spoiling.",
    icon: Sparkles,
  },
  {
    title: "Run Code",
    description: "Execute in 40+ languages instantly.",
    icon: Play,
  },
  {
    title: "Ace Interview",
    description: "Receive reports and improve every session.",
    icon: Star,
  },
];

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-20 text-center">
        <SectionEyebrow>How it works</SectionEyebrow>

        <h2 className="text-gradient mt-4 text-4xl font-semibold sm:text-5xl">
          Six steps between you and a{" "}
          <span className="text-gradient-violet font-display italic font-normal">
            callback.
          </span>
        </h2>
      </div>

      <div className="relative">

        {/* Timeline */}

        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-violet/70 via-violet/20 to-transparent md:block" />

        <div className="space-y-16">

          {steps.map((step, index) => {

            const Icon = step.icon;

            const left = index % 2 === 0;

            return (
              <div
                key={step.title}
                className="grid items-center md:grid-cols-[1fr_auto_1fr]"
              >

                {/* LEFT */}

                <div
                  className={`${
                    left
                      ? "flex justify-end pr-10"
                      : ""
                  }`}
                >
                  {left && (
                    <div className="flex items-start gap-4 max-w-sm">

                      <div className="glass grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                        <Icon className="h-6 w-6 text-violet" />
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          STEP {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-1 text-2xl font-semibold">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                          {step.description}
                        </p>
                      </div>

                    </div>
                  )}
                </div>

                {/* CENTER */}

                <div className="hidden md:flex h-full items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-4 border-background bg-violet shadow-[0_0_18px_var(--violet-glow)]" />
                </div>

                {/* RIGHT */}

                <div
                  className={`${
                    !left
                      ? "flex justify-start pl-10"
                      : ""
                  }`}
                >
                  {!left && (
                    <div className="flex items-start gap-4 max-w-sm">

                      <div className="glass grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                        <Icon className="h-6 w-6 text-violet" />
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          STEP {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-1 text-2xl font-semibold">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                          {step.description}
                        </p>
                      </div>

                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile */}

        <div className="space-y-8 md:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex items-start gap-4"
              >
                <div className="glass grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                  <Icon className="h-6 w-6 text-violet" />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    STEP {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;