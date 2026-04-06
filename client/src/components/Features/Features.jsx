import React from 'react'
import { Brain, Users, Globe, MessageSquare } from 'lucide-react';
  
  

const Features = () => {
  return (
    <section className="relative py-12 px-6 bg-gradient-to-b from-[#0f172a] to-slate-900 overflow-hidden min-h-screen">

  {/* Subtle Purple Glow Background */}
  {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] pointer-events-none" /> */}

  <div className="relative max-w-6xl mx-auto space-y-20">

    {/* Section Heading */}
    <div className="text-center space-y-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
        Everything You Need for Interview Preparation
      </h2>
      <p className="text-zinc-400 max-w-2xl mx-auto">
        A complete collaborative workspace designed to help students prepare,
        practice, and succeed in coding interviews.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid md:grid-cols-2 gap-10 pt-20">

      {[
        {
          icon: <Brain className="w-6 h-6" />,
          title: "On-Demand AI Assistant",
          desc: "Ask questions about your logic, algorithms, or edge cases and receive real-time guidance inside your coding room.",
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Live Coding Rooms",
          desc: "Practice mock interviews or pair programming with synchronized real-time code editing.",
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: "Multi-Language Support",
          desc: "JavaScript, Python, Java, C++, and more — practice in your preferred interview language.",
        },
        {
          icon: <MessageSquare className="w-6 h-6" />,
          title: "Built-In Discussion",
          desc: "Discuss approaches, clarify doubts, and collaborate seamlessly while solving problems.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="group bg-slate-800/60 backdrop-blur-sm 
                     border border-slate-700 
                     rounded-2xl p-8 
                     transition-all duration-300 
                     hover:border-purple-500 
                     hover:-translate-y-2 
                     hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
        >
          <div className="flex items-start gap-4">

            {/* Icon */}
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 
                            group-hover:bg-purple-500/20 transition">
              {feature.icon}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>
  )
}

export default Features
