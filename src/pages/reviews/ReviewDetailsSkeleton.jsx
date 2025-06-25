import { Skeleton } from "@/components/ui/skeleton";

const ReviewDetailsSkeleton = () => {
  return (
    <div className="w-full mt-3 bg-white p-5 rounded-lg space-y-4">
      {/* Header: Image + Name + Stars */}
      <div className="flex gap-3 items-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Review description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Date */}
      <Skeleton className="h-4 w-24" />

      {/* Vendor details section */}
      <div className="my-6 py-6 border-t border-b border-[#CECECE] flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>

      {/* Items table headers */}
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12 mx-auto" />
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>

      {/* Sample item row */}
      <div className="flex flex-col gap-3 mt-5">
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-8 mx-auto" />
          <Skeleton className="h-4 w-12 ml-auto" />
        </div>
      </div>

      {/* Total row */}
      <div className="grid grid-cols-3 gap-3 mt-3 border-t-2 border-dashed pt-3">
        <Skeleton className="h-4 w-24" />
        <div></div>
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>
    </div>
  );
};

export default ReviewDetailsSkeleton;
