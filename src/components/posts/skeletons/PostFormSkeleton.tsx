import FormFieldSkeleton from "../../skeletons/FormFieldSkeleton";
import Skeleton from "../../skeletons/Skeleton";

export default function PostFormSkeleton() {
  return (
    <div className="p-6 border border-border rounded-card">
      <Skeleton className="w-30 h-8 rounded-full" />

      <div className="mb-6 mt-4">
        <FormFieldSkeleton />

        <div className="border border-border p-4 rounded-field">
          <Skeleton className="w-40 h-5 rounded-full mb-2" />
          <Skeleton className="w-50 h-5 rounded-full mb-2" />
          <Skeleton className="w-60 h-5 rounded-full" />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Skeleton className="w-20 h-10 rounded-full" />
      </div>
    </div>
  );
}
