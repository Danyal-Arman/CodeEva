import React from 'react'
import { Rocket } from 'lucide-react';
const CTASection = () => {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-slate-900 to-[#0f172a] overflow-hidden">

  {/* Subtle background glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-4xl mx-auto text-center space-y-10">

    <div className="flex justify-center">
      <div className="p-4 bg-purple-500/10 text-purple-400 rounded-2xl">
        <Rocket className="w-8 h-8" />
      </div>
    </div>

    <h2 className="text-3xl sm:text-4xl font-semibold">
      Ready to Elevate Your Coding Interviews?
    </h2>

    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
      Create your first mock interview room and start practicing with real-time collaboration and AI guidance.
    </p>

    <div className="pt-4">
      <button className="bg-purple-600 hover:bg-purple-700 transition 
                         px-10 py-5 rounded-xl font-medium text-lg 
                         shadow-lg shadow-purple-500/20 
                         hover:shadow-purple-500/40 
                         hover:-translate-y-1 duration-300">
        Start Your First Practice Room
      </button>
    </div>

  </div>

</section>
  )
}

export default CTASection
