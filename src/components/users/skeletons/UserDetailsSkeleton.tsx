import Skeleton from "../../skeletons/Skeleton";

export default function UserDetailsSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 border border-light rounded-lg">
      <Skeleton className="w-30 h-8 rounded-full" />

      <div className="mb-6 mt-4">
        <Skeleton className="w-40 h-10 rounded-full mb-1" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>

      <div className="mb-6">
        <Skeleton className="w-20 h-8 rounded-full mb-1" />
        <Skeleton className="w-30 h-5 rounded-full mb-1" />
        <Skeleton className="w-40 h-5 rounded-full mb-1" />
        <Skeleton className="w-40 h-5 rounded-full mb-1" />
      </div>

      <div>
        <Skeleton className="w-20 h-8 rounded-full mb-1" />
        <Skeleton className="w-30 h-5 rounded-full mb-1" />
        <Skeleton className="w-40 h-5 rounded-full mb-1" />
      </div>

      <div className="flex justify-end gap-2">
        <Skeleton className="w-15 h-10 rounded-full" />
        <Skeleton className="w-20 h-10 rounded-full" />
      </div>
    </div>
  );
}
