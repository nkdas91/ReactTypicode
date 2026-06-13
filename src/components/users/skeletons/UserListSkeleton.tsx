import FormFieldSkeleton from "../../skeletons/FormFieldSkeleton";
import Skeleton from "../../skeletons/Skeleton";

export default function UserListSkeleton() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="h-5 w-20 rounded-full" />

          <Skeleton className="h-10 w-20 rounded-full" />
        </div>

        <FormFieldSkeleton />
      </div>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border border-border p-2 flex justify-between items-center flex-wrap gap-2"
        >
          <Skeleton className="h-5 w-40 rounded-full" />

          <div className="flex gap-2">
            <Skeleton className="h-10 w-20 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
