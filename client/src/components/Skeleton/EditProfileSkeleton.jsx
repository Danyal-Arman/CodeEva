import { Skeleton } from "../../components/Ui/skeleton"

const EditProfileSkeleton = () => {
  return (
    <section className="relative max-w-7xl mx-auto min-h-[calc(100vh-40px)] bg-zinc-900 flex items-center justify-center px-4">
      
      <div className="w-full max-w-xl border-4 border-zinc-700 text-white rounded-2xl shadow-sm p-8">
        
        {/* Heading */}
        <Skeleton className="absolute top-10 left-4 h-6 w-40" />

        {/* Form */}
        <div className="space-y-5 mt-6">

          {/* Name */}
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Bio */}
          <div>
            <Skeleton className="h-4 w-12 mb-2" />
            <Skeleton className="h-16 w-full" />
          </div>

          {/* Location */}
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Website */}
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Skeleton className="h-9 w-20 rounded-sm" />
            <Skeleton className="h-9 w-32 rounded-sm" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default EditProfileSkeleton