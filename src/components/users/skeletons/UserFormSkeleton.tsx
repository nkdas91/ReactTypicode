import FormFieldSkeleton from "../../skeletons/FormFieldSkeleton";
import Skeleton from "../../skeletons/Skeleton";

export default function UserFormSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 border border-light rounded-lg">
      <Skeleton className="w-30 h-8 rounded-full" />

      <div className="mb-6 mt-4 grid md:grid-cols-2 gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <FormFieldSkeleton key={index} />
        ))}
      </div>

      <div className="mb-6">
        <Skeleton className="w-20 h-8 rounded-full mb-1" />
        <div className="grid md:grid-cols-2 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <FormFieldSkeleton key={index} />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="w-20 h-8 rounded-full mb-1" />
        <div className="grid md:grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <FormFieldSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Skeleton className="w-20 h-10 rounded-full" />
      </div>
    </div>
  );
}
