import React from "react";

const AppBootLoader = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden z-50">

      {/* Subtle Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/10 blur-3xl opacity-50" />

      {/* Center Content */}
      <div className="relative flex flex-col items-center gap-6">

        {/* Logo / Brand Mark */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white font-bold text-xl">CE</span>
        </div>

        {/* Title */}
        <h1 className="text-zinc-200 text-lg font-medium tracking-wide">
          Collaborative Editor
        </h1>

        {/* Status Text */}
        <p className="text-zinc-400 text-sm tracking-wide">
          Restoring session...
        </p>

        {/* Thin Progress Bar */}
        <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-indigo-500 animate-[loading_1.2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
};

export default AppBootLoader;