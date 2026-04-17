import { Skeleton } from "../../components/Ui/skeleton";

const AISkeleton = () => {
  return (
    <div className="flex flex-col h-[90vh] min-h-0">
      
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center w-full gap-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full rounded-md" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-5">
        
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className={`flex gap-2 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            {i % 2 === 0 && <div>
              <Skeleton className="h-8 w-8 rounded-md bg-zinc-800" />
            </div>}
            <div className="rounded-xl min-w-[65%] max-w-[70%] p-3 space-y-2 bg-zinc-100 dark:bg-zinc-800">
              
              {/* Username */}
              <Skeleton className="h-3 w-20" />

              {/* Message lines */}
              <Skeleton className="h-3 w-full" />
              {/* <Skeleton className="h-3 w-4/5" /> */}

              {/* Timestamp */}
              {/* <div className="flex justify-end">
                <Skeleton className="h-2 w-10" />
              </div> */}
            </div>
            {i % 2 !== 0 && <div>
              <Skeleton className="h-8 w-8 rounded-md bg-zinc-800" />
            </div>}
          </div>
        ))}

      </div>

      {/* Input Area */}
      <div className="px-3 pt-3 pb-[3.2rem] border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
};

export default AISkeleton;