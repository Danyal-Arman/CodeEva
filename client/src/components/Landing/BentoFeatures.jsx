import {
  Sparkles,
  Users,
  Globe,
  Cpu,
} from "lucide-react";

import SectionEyebrow from "./SectionEyebrow";
import BentoCard from "./BentoCard";

const BentoFeatures = () => {

  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "PHP",
    "Swift",
    "Kotlin",
    "Ruby",
    "+31",
  ];

  const interviewStats = [
    {
      label:"Time",
      value:"45:00",
    },
    {
      label:"Solved",
      value:"2/3",
    },
    {
      label:"Score",
      value:"8.4",
    },
  ];

  return (

    <section className="mx-auto max-w-6xl px-6 py-32">

      <div className="mb-16 max-w-2xl">

        <SectionEyebrow>
          Features
        </SectionEyebrow>

        <h2 className="text-gradient mt-3 text-4xl font-semibold sm:text-5xl">

          Everything you need,{" "}

          <span className="text-gradient-violet italic font-display font-normal">

            nothing you don't.

          </span>

        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[repeat(4,minmax(0,1fr))]">

        {/* AI */}

        <BentoCard className="md:col-span-4 md:row-span-2">

          ...

        </BentoCard>

        {/* Multiplayer */}

        <BentoCard className="md:col-span-2 md:row-span-2">

          ...

        </BentoCard>

        {/* Languages */}

        <BentoCard className="md:col-span-2 md:row-span-2">

          <div className="flex h-full flex-col justify-between p-6">

            <div className="flex items-center gap-2">

              <Globe className="h-4 w-4 text-violet"/>

              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">

                Languages

              </span>

            </div>

            <div className="my-3 flex flex-wrap gap-2">

              {languages.map((language)=>(

                <span
                  key={language}
                  className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] ring-1 ring-white/5"
                >

                  {language}

                </span>

              ))}

            </div>

            <div>

              <h3 className="text-lg font-medium">

                40+ Languages

              </h3>

              <p className="text-muted-foreground">

                Powered by Judge0.

              </p>

            </div>

          </div>

        </BentoCard>

        {/* Interview */}

        <BentoCard className="md:col-span-4 md:row-span-2">

          <div className="flex h-full flex-col justify-between p-7">

            <div className="flex items-center gap-2">

              <Cpu className="h-4 w-4 text-violet"/>

              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">

                Interview Mode

              </span>

            </div>

            <div className="my-6 grid grid-cols-3 gap-3">

              {interviewStats.map((item)=>(

                <div
                  key={item.label}
                  className="glass rounded-xl p-3"
                >

                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">

                    {item.label}

                  </div>

                  <div className="mt-1 font-mono text-2xl font-semibold">

                    {item.value}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </BentoCard>

      </div>

    </section>

  );
};

export default BentoFeatures;