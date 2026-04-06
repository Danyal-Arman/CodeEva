import { Skeleton } from "../../components/ui/skeleton";

const UsersSkeleton = () => {
  return (
    <div className="h-full flex flex-col min-h-0">
      
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <Skeleton className="h-4 w-40 bg-zinc-900/90" />
      </div>

      {/* Users List */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-1">
        
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2 rounded-lg"
          >
            
            {/* Left: status + name */}
            <div className="flex items-center gap-3">
              
              {/* Status dot */}
              <Skeleton className="h-4 w-4 rounded-full bg-zinc-900/90" />

              {/* Name + role */}
              <div className="flex flex-col gap-1">
                
                {/* Username */}
                <Skeleton className="h-3 w-24 bg-zinc-900/90" />

                {/* Role */}
                <Skeleton className="h-2 w-16 bg-zinc-900/90" />
              </div>
            </div>

            {/* Right: action button */}
            <Skeleton className="h-5 w-5 rounded-md bg-zinc-900/90" />
          </div>
        ))}

      </div>
    </div>
  );
};

export default UsersSkeleton;