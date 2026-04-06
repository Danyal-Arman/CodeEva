import React from "react";

const CollaborativeEditor = () => {
  return (
    <div className="flex flex-col h-full bg-gray-950/50 text-sm font-mono leading-relaxed rounded-lg shadow-3xl transition-all animate-pulse ">
      <div className="flex-1 p-6 overflow-y-auto">
        <div>
          <span className="text-purple-400">async</span>{" "}
          <span className="text-purple-400">function</span>{" "}
          <span className="text-blue-300">initSession</span>
          <span className="text-white">() {"{"}</span>
        </div>

        <div>
          &nbsp;&nbsp;
          <span className="text-purple-400">const</span>{" "}
          <span className="text-white">session</span>{" "}
          <span className="text-white">=</span>{" "}
          <span className="text-purple-400">await</span>{" "}
          <span className="text-blue-300">createCollabSession</span>
          <span className="text-white">({"{"}</span>
        </div>

        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-red-300">projectId</span>
          <span className="text-white">:</span>{" "}
          <span className="text-orange-400">'collaborative-session'</span>
          <span className="text-white">,</span>
        </div>

        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-red-300">mode</span>
          <span className="text-white">:</span>{" "}
          <span className="text-orange-400">'javascript'</span>
          <span className="text-white">,</span>
        </div>

        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-red-300">theme</span>
          <span className="text-white">:</span>{" "}
          <span className="text-orange-400">'midnight'</span>
        </div>

        <div>
          &nbsp;&nbsp;<span className="text-white">{"});"}</span>
        </div>

        <br />

        <div>
          &nbsp;&nbsp;
          <span className="text-purple-400">const</span>{" "}
          <span className="text-white">users</span>{" "}
          <span className="text-white">=</span>{" "}
          <span className="text-purple-400">await</span>{" "}
          <span className="text-white">session</span>.
          <span className="text-blue-300">getActiveUsers</span>
          <span className="text-white">();</span>
        </div>

        <div>
          &nbsp;&nbsp;
          <span className="text-white">console</span>.
          <span className="text-blue-300">log</span>
          <span className="text-white">(</span>
          <span className="text-orange-400">`$</span>
          <span className="text-white">{"{"}</span>
          <span className="text-white">users</span>.
          <span className="text-red-300">length</span>
          <span className="text-white">{"}"}</span>
          <span className="text-orange-400"> users connected`</span>
          <span className="text-white">);</span>
        </div>

        <br />

        <div>
          &nbsp;&nbsp;
          <span className="text-purple-400">return</span>{" "}
          <span className="text-white">session</span>
          <span className="text-white">;</span>
        </div>

        <div>
          <span className="text-white">{"}"}</span>
        </div>
      </div>

      {/* ───── bottom bar ───── */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-700 rounded-b-lg ">
        {/* collaborator avatars */}        
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            <div className="h-6 w-6 rounded-full bg-blue-500  border-2 border-gray-800" />
            <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-gray-800" />
            <div className="h-6 w-6 rounded-full bg-yellow-500 border-2 border-gray-800" />
          </div>
          <span className="text-gray-400 text-sm">3 collaborators</span>
        </div>

        {/* action buttons */}
        <div className="flex space-x-3">
          <button type="button" aria-label="Action" className="text-gray-400 hover:text-white transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </button>

          <button type="button" aria-label="Action" className="text-gray-400 hover:text-white transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeEditor;
