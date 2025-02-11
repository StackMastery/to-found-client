import { Skeleton } from "../ui/skeleton";

const AllRecoveredLoader = () => {
  return (
    <>
      <section className="w-full flex justify-center overflow-x-auto">
        <div className="w-primary px-5 py-10 flex justify-center">
          <div className="space-y-4 w-full">
            <div className="h-6 w-1/4 bg-neutral-300 rounded dark:bg-neutral-700"></div>
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-1/6" />
              <Skeleton className="h-10 w-1/4" />
              <Skeleton className="h-10 w-1/5" />
              <Skeleton className="h-10 w-1/5" />
              <Skeleton className="h-10 w-1/6" />
              <Skeleton className="h-10 w-1/5" />
            </div>
            {[...Array(6)]?.map((_, index) => (
              <div key={index} className="flex space-x-4">
                <Skeleton className="h-8 w-1/6" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-8 w-1/6" />
                <Skeleton className="h-8 w-1/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllRecoveredLoader;
