import React from 'react'
import { Briefcase, BookOpen, Users, GraduationCap } from 'lucide-react';

const UsecaseSection = () => {
  return (
   <section className="py-28 px-6 bg-slate-900">

  <div className="max-w-6xl mx-auto space-y-20">

    <div className="text-center space-y-4">
      <h2 className="text-3xl sm:text-4xl font-semibold">
        Designed for Real Interview Scenarios
      </h2>
      <p className="text-zinc-400 max-w-2xl mx-auto">
        CodeEva adapts to different preparation styles — whether you're practicing solo or simulating real interviews.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          icon: <Briefcase className="w-6 h-6" />,
          title: "Mock Interviews",
          desc: "Simulate real technical interviews with structured live sessions.",
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: "DSA Practice",
          desc: "Solve algorithm and data structure problems collaboratively.",
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Pair Programming",
          desc: "Work through complex problems together in real-time rooms.",
        },
        {
          icon: <GraduationCap className="w-6 h-6" />,
          title: "Mentor Sessions",
          desc: "Learn from mentors and receive guided explanations live.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-8 
                     hover:border-purple-500 transition-all duration-300 
                     hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          <div className="space-y-4">

            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>

            <p className="text-zinc-400">
              {item.desc}
            </p>

          </div>
        </div>
      ))}

    </div>

  </div>

</section>
  )
}

export default UsecaseSection
