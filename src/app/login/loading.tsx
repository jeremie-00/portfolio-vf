import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Skeleton className="h-10 w-52" />
    </div>
  );
}
