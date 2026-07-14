import {
  Search,
  Folder,
  FileCode2,
  Terminal,
  Circle,
  Check,
  Sparkles,
  Bot,
  Wand2,
  MessageSquare,
  Send,
  Play,
} from "lucide-react";

import AvatarStack from "../ui/AvatarStack";
import CodeBlock from "../ui/CodeBlock";
import ChatMsg from "../ui/ChatMsg";

const ProductPreview = () => {
  const files = [
    { icon: Folder, label: "problems", muted: true },
    { icon: FileCode2, label: "two-sum.ts", active: true },
    { icon: FileCode2, label: "valid-parens.ts", muted: true },
    { icon: FileCode2, label: "binary-tree.ts", muted: true },
    { icon: Folder, label: "tests", muted: true },
    { icon: FileCode2, label: "notes.md", muted: true },
  ];

  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),0_0_0_1px_oklch(1_0_0/0.06)]">

      <div className="rounded-xl bg-[oklch(0.13_0.03_265)] ring-1 ring-white/5">

        {/* Window Chrome */}

        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <div className="hidden items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 text-[11px] text-muted-foreground md:flex">
            <Search className="h-3 w-3" />
            <span>two-sum · room / codeeva.dev</span>
          </div>

          <AvatarStack />

        </div>

        {/* Body */}

        <div className="grid grid-cols-12">

          {/* Explorer */}

          <aside className="col-span-3 hidden border-r border-white/5 p-3 sm:block md:col-span-2">

            <div className="mb-3 flex items-center justify-between text-[10.5px] uppercase tracking-wider text-muted-foreground">
              <span>Explorer</span>
              <Folder className="h-3 w-3" />
            </div>

            <ul className="space-y-0.5 text-[12px]">
              {files.map((file, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 rounded-md px-2 py-1 ${
                    file.active
                      ? "bg-violet/15 text-foreground ring-1 ring-violet/20"
                      : "text-muted-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  <file.icon className="h-3 w-3" />
                  <span className="truncate">{file.label}</span>
                </li>
              ))}
            </ul>

          </aside>

          {/* Editor */}

          <div className="col-span-12 sm:col-span-9 md:col-span-7">

            <div className="flex items-center gap-1 border-b border-white/5 px-3 py-1.5 text-[11.5px] text-muted-foreground">

              <span className="rounded-md bg-white/[0.05] px-2 py-1 text-foreground">
                two-sum.ts
              </span>

              <span className="rounded-md px-2 py-1">
                valid-parens.ts
              </span>

            </div>

            <div className="relative p-4 font-mono text-[12.5px] leading-6">

              <CodeBlock />

              {/* Remote Cursor */}

              <div className="pointer-events-none absolute left-[42%] top-[92px] animate-caret">

                <div className="flex flex-col">

                  <div className="h-4 w-[2px] bg-[oklch(0.7_0.2_150)]" />

                  <div className="mt-0.5 rounded-md rounded-tl-none bg-[oklch(0.7_0.2_150)] px-1.5 py-0.5 text-[10px] font-medium text-black">

                    Priya

                  </div>

                </div>

              </div>

              {/* Your Cursor */}

              <div className="pointer-events-none absolute left-[28%] top-[148px]">

                <div className="flex flex-col">

                  <div className="h-4 w-[2px] animate-pulse-glow bg-violet" />

                  <div className="mt-0.5 rounded-md rounded-tl-none bg-violet px-1.5 py-0.5 text-[10px] font-medium text-white">

                    You

                  </div>

                </div>

              </div>

            </div>

            {/* Terminal */}

            <div className="border-t border-white/5 bg-black/30 p-3 font-mono text-[11.5px]">

              <div className="mb-1.5 flex items-center gap-2 text-[10.5px] uppercase tracking-wider text-muted-foreground">

                <Terminal className="h-3 w-3" />

                Output

                <span className="ml-auto flex items-center gap-1 text-[oklch(0.7_0.2_150)]">

                  <Circle className="h-1.5 w-1.5 fill-current" />

                  Judge0 · passed 3/3

                </span>

              </div>

              <div className="space-y-0.5">

                <div className="text-muted-foreground">

                  <span className="text-violet">$</span>

                  {" "}node two-sum.js

                </div>

                <div className="text-foreground">[ 0, 1 ]</div>

                <div className="text-muted-foreground">

                  Runtime:

                  <span className="text-foreground"> 62ms </span>

                  · Memory:

                  <span className="text-foreground"> 42.1 MB</span>

                </div>

                <div className="flex items-center gap-1 text-[oklch(0.7_0.2_150)]">

                  <Check className="h-3 w-3" />

                  All tests passed

                  <span className="ml-1 h-3 w-1.5 animate-blink bg-violet" />

                </div>

              </div>

            </div>

          </div>

          {/* AI Sidebar */}

          {/* Paste your AI Sidebar exactly as it is */}

        </div>

        {/* Bottom Bar */}

        {/* Paste your Bottom Bar exactly as it is */}

      </div>

    </div>
  );
};

export default ProductPreview;