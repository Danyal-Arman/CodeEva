import { ArrowUpRight } from "lucide-react";

import SectionEyebrow from "./SectionEyebrow";
import CollabVisual from "./CollabVisual";
import AiVisual from "./AiVisual";
import TerminalVisual from "./TerminalVisual";
import InterviewVisual from "./InterviewVisual";

const Showcase = () => {
  const rows = [
    {
      eyebrow: "Real-time collaboration",
      title: "Type together. Think together.",
      body:
        "Multiplayer cursors, presence, live selections, and shared editor state — powered by WebSockets that never drop a keystroke.",
      visual: <CollabVisual />,
    },
    {
      eyebrow: "AI guidance",
      title: "A senior engineer, in the room with you.",
      body:
        "Eva watches your code, explains algorithms, suggests optimizations, and analyzes time complexity — never solving it for you.",
      visual: <AiVisual />,
      reverse: true,
    },
    {
      eyebrow: "In-browser execution",
      title: "Run code. See results. Instantly.",
      body:
        "40+ languages, isolated sandboxes, sub-second cold starts. Powered by Judge0 with a UI that respects your keyboard.",
      visual: <TerminalVisual />,
    },
    {
      eyebrow: "Interview mode",
      title: "Timed sessions, whiteboard-quiet.",
      body:
        "Structured 45-minute mocks with hidden test cases, question banks, and post-interview feedback reports.",
      visual: <InterviewVisual />,
      reverse: true,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-32">

      <div className="mb-20 max-w-2xl">

        <SectionEyebrow>
          The product
        </SectionEyebrow>

        <h2 className="text-gradient mt-3 text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">

          Every part of the interview,{" "}

          <span className="text-gradient-violet font-display font-normal italic">

            rebuilt.

          </span>

        </h2>

      </div>

      <div className="space-y-28">

        {rows.map((row, index) => (

          <div
            key={index}
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
              row.reverse
                ? "md:[&>*:first-child]:order-2"
                : ""
            }`}
          >

            <div>

              <SectionEyebrow>
                {row.eyebrow}
              </SectionEyebrow>

              <h3 className="text-gradient mt-3 text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-[38px]">

                {row.title}

              </h3>

              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">

                {row.body}

              </p>

              <a
                href="#"
                className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-violet transition"
              >

                Learn more

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

              </a>

            </div>

            <div>
              {row.visual}
            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Showcase;