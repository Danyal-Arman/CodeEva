import { Skeleton } from "../../components/Ui/skeleton"

const ProfileSkeleton = () => {
  return (
    <section className="bg-zinc-900 m-3.5 md:m-0">
      <div className="max-w-6xl md:py-[180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ================= LEFT PROFILE CARD ================= */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">

              {/* Avatar */}
              <Skeleton className="w-[100px] h-[100px] rounded-full" />

              {/* Username */}
              <Skeleton className="mt-4 h-5 w-32" />
            </div>

            {/* Stats */}
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-10" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          {/* ================= RIGHT ACCOUNT INFO ================= */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-sm">
            
            {/* Title */}
            <Skeleton className="h-6 w-48 mb-8" />

            <div className="space-y-8">

              {/* Email */}
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-5 w-64" />
              </div>

              {/* Location */}
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-40" />
              </div>

              {/* Bio */}
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Joined */}
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProfileSkeleton