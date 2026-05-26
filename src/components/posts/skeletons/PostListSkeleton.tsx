import FormFieldSkeleton from "../../skeletons/FormFieldSkeleton";
import Skeleton from "../../skeletons/Skeleton";

export default function PostListSkeleton() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">
        <Skeleton className="h-5 w-20 rounded-full" />
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end md:items-center gap-3">
        <div className="order-2 sm:order-1">
          <FormFieldSkeleton />
        </div>

        <div className="order-1 sm:order-2 flex flex-col md:flex-row items-end md:items-center self-end gap-3 mb-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />

            <FormFieldSkeleton />
          </div>

          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-10 rounded-full" />

            <div className="border border-gray-100 p-4 rounded-md flex justify-between items-center">
              <Skeleton className="w-10 h-5 rounded-full" />
            </div>

            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        </div>
      </div>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-100 p-2 flex justify-between items-center flex-wrap gap-2"
        >
          <Skeleton className="h-5 w-40 rounded-full" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />

            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
