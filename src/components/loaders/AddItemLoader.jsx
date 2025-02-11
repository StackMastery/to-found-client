import { Skeleton } from "../ui/skeleton";

const AddItemLoader = () => {
    return (
        <>
            <section className="flex justify-center py-40">
                <div className="w-primary px-5 inline-flex justify-center">
                <form className="bg-cover bg-no-repeat bg-center w-full border p-10 md:w-9/12 lg:w-[900px] rounded-xl">
                    
                    <div className="relative w-full h-40 bg-gray-300 animate-pulse rounded-xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Skeleton className="w-32 h-32 rounded-xl" />
                    </div>
                    </div>

                    <div className="pt-5 flex justify-between gap-5 flex-wrap md:flex-nowrap">
                    <div className="w-full">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    </div>

                    <div className="pt-5 flex justify-between gap-5">
                    <div className="flex-grow">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    </div>

                    <div className="pt-5 flex justify-between gap-5">
                    <div className="flex-grow">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    </div>

                    <div className="pt-5 flex justify-between gap-5 flex-wrap md:flex-nowrap overflow-x-hidden max-w-full">
                    <div className="w-full">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-10 rounded-md w-full" />
                    </div>
                    </div>
                </form>
                </div>
            </section>

        </>
    );
}

export default AddItemLoader