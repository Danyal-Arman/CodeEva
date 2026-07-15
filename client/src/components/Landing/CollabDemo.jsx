import {
  MessageSquare,
  Sparkles,
  Terminal,
} from "lucide-react";

import SectionEyebrow from "./SectionEyebrow";
import AvatarStack from "../Ui/AvatarStack";
import CodeBlock from "../Ui/CodeBlock";
import ChatMsg from "../Ui/ChatMsg";

const CollabDemo = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <div className="mb-14 max-w-2xl">
        <SectionEyebrow>Collaborative coding</SectionEyebrow>

        <h2 className="text-gradient mt-3 text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
          Two developers.{" "}
          <span className="text-gradient-violet font-display italic font-normal">
            One heartbeat.
          </span>
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Editor */}
        <div className="glass rounded-2xl p-6 md:col-span-2">
          <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
            <span>Editor · shared</span>

            <span className="flex items-center gap-2">
              <AvatarStack />
            </span>
          </div>

          <div className="rounded-lg bg-black/30 p-4 font-mono text-[13px]">
            <CodeBlock />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11.5px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.2_150)]" />
              Priya is typing
            </span>

            <span className="text-white/20">·</span>

            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              You edited line 5
            </span>

            <span className="text-white/20">·</span>

            <span className="flex items-center gap-1 text-violet">
              <Sparkles className="h-3 w-3" />
              Eva is watching
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="grid gap-4">
          {/* Chat */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              Chat
            </div>

            <div className="space-y-2 text-[13px]">
              <ChatMsg
                who="Priya"
                color="oklch(0.7 0.2 150)"
              >
                what if the array has dupes?
              </ChatMsg>

              <ChatMsg
                who="You"
                color="oklch(0.68 0.14 165)"
                me
              >
                map handles it — check the get
              </ChatMsg>

              <ChatMsg
                who="Priya"
                color="oklch(0.7 0.2 150)"
              >
                🔥 running it now
              </ChatMsg>
            </div>
          </div>

          {/* Run */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
              <Terminal className="h-3 w-3" />
              Run
            </div>

            <div className="font-mono text-[12px] text-muted-foreground">
              <div>$ codeeva run two-sum.ts</div>

              <div className="text-[oklch(0.7_0.2_150)]">
                ✓ 3/3 passed · 62ms · 42.1MB
              </div>

              <div>
                →
                <span className="inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-violet" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollabDemo;