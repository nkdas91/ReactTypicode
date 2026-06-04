import Skeleton from "./Skeleton";

export default function FormFieldSkeleton() {
  return (
    <div className="border border-light p-4 rounded-field mb-1">
      <Skeleton className="w-40 h-5 rounded-full" />
    </div>
  );
}
