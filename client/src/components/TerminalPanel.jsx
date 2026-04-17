import React from "react";

const TerminalPanel = ({
  output,
  isTerminalOpen,
  setIsTerminalOpen,
  isSidebarOpen,
  isFileSidebarOpen,
  isVersionSidebarOpen,
  rightWidth,
}) => {

const getWidth = () =>{

  if (isSidebarOpen && !isFileSidebarOpen && !isVersionSidebarOpen) {
    return `calc(100% - ${rightWidth}px - 63px)`;
  }

  if (isSidebarOpen && (isFileSidebarOpen || isVersionSidebarOpen)) {
    return "calc(100% - 703px)";

  }
  if(isFileSidebarOpen || isVersionSidebarOpen){

    return "calc(100% - 354px)";
  }
  return "calc(100% - 64px)"
}
  return (
    <div
      className={` fixed bottom-0 left-13 h-[280px] bg-gray-200 dark:bg-black text-white text-sm font-mono border-t border-gray-600 shadow-xl z-10  ${isTerminalOpen ? "translate-y-0" : "translate-y-full"}`}
      style={{width: getWidth()}}
   >
      <div className="flex justify-between items-center px-4 py-2 dark:bg-zinc-900  border-b border-zinc-700">
        <span className="text-blue-400">📤 Output</span>
        <button
          onClick={() => setIsTerminalOpen(false)}
          className="text-red-400 hover:text-red-300"
        >
          ✕
        </button>
      </div>
      <div className="overflow-y-auto px-5 py-2 h-[240px] whitespace-pre-wrap text-green-600 dark:text-white">
        {output}
      </div>
    </div>
  );
};

export default TerminalPanel;
