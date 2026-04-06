import React from "react";

const WorkSpaceLoader = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-[999] h-full">
      <div>Setting up your workspace</div>
      <div>
        This won't{" "}
        <span className="text-yellow-200 animate-pulse">take long...</span>
      </div>
    </div>
  );
};

export default WorkSpaceLoader;
