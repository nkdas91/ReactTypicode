import Skeleton from "../../skeletons/Skeleton";

export default function PostDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto mb-5 p-6 border border-gray-100 rounded-lg">
      <div className="flex justify-between aligh-center gap-4">
        <Skeleton className="w-30 h-8 rounded-full" />

        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      <div className="mb-6 mt-4">
        <Skeleton className="max-w-100 h-8 rounded-full mb-1" />
        <Skeleton className="w-30 h-5 rounded-full" />
      </div>

      <div className="mb-6">
        <Skeleton className="max-w-150 h-5 rounded-full mb-1" />
        <Skeleton className="max-w-180 h-5 rounded-full" />
      </div>

      <div className="flex justify-end gap-2">
        <Skeleton className="w-15 h-10 rounded-full" />
        <Skeleton className="w-20 h-10 rounded-full" />
      </div>
    </div>
  );
}
