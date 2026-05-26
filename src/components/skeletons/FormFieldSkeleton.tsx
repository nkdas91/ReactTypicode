import Skeleton from "./Skeleton";

export default function FormFieldSkeleton() {
  return (
    <div className="border border-gray-100 p-4 rounded-md mb-1">
      <Skeleton className="w-40 h-5 rounded-full" />
    </div>
  );
}
