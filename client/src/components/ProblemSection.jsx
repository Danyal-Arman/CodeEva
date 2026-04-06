import React from 'react'
import { XCircle } from "lucide-react";


const ProblemSection = () => {
  return (
<section className="bg-slate-900 pt-12 pb-28 md:py-28 px-6 min-h-[80vh]">
  <div className="max-w-6xl mx-auto text-center space-y-16">

    <div className="space-y-24">
      <h2 className="text-3xl sm:text-4xl font-semibold">
        Preparing for Coding Interviews Is Hard Alone
      </h2>

      <p className="text-zinc-400 max-w-2xl mx-auto">
        Many students struggle without the right environment, feedback,
        or collaborative support during interview preparation.
      </p>
    </div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        "No real interview simulation environment",
        "No live collaboration with peers",
        "No structured discussion while solving problems",
        "No instant guidance when stuck on algorithms",
      ].map((item, index) => (
        <div
          key={index}
          className="group bg-[#1e293b] border border-zinc-800 
                     rounded-2xl p-6 text-left 
                     hover:border-purple-500 
                     transition-all duration-300 
                     hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                     hover:-translate-y-2"
        >
          <div className="flex items-start gap-4">

            <div className="p-2 rounded-lg bg-red-500/10">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>

            <p className="text-zinc-300 leading-relaxed">
              {item}
            </p>

          </div>
        </div>
      ))}

    </div>

  </div>
</section>

  )
}

export default ProblemSection
