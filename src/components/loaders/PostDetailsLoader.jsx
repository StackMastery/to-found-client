import { Skeleton } from "../ui/skeleton";

const PostDetailsLoader = () => {
    return (
        <>
            <section className="flex justify-center">
                <div className="w-primary gap-5 flex-col md:flex-row inline-flex px-5 py-10">
                    {/* Main Content Skeleton */}
                    <div className="space-y-5 w-full md:w-8/12">
                    <div className="space-y-5">
                        <div className="flex gap-3 items-center">
                        <Skeleton className="w-10 h-10 rounded-full" /> {/* For the profile image */}
                        <div className="space-y-1">
                            <Skeleton className="w-32 h-5" /> {/* For the name */}
                            <Skeleton className="w-20 h-4" /> {/* For the timestamp */}
                        </div>
                        </div>
                        <Skeleton className="w-full h-[1px]" /> {/* Divider */}
                        <Skeleton className="w-3/4 h-8" /> {/* For the title */}
                    </div>
                    <Skeleton className="w-full h-[350px] md:h-[500px] rounded-xl" /> {/* For the image */}
                    <div className="py-5 space-y-3">
                        <Skeleton className="w-full h-4" /> {/* Multiple lines for content */}
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-3/4 h-4" />
                    </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-5 w-full md:w-4/12">
                    <div className="fixed md:static w-full flex-col flex bottom-[85px] z-[9999] left-0">
                        <div className="bg-white border rounded-t-2xl md:rounded-b-2xl p-5 shadow-sm w-full">
                        <Skeleton className="w-full h-10" /> {/* For the button */}
                        <div className="hidden md:block space-y-5">
                            <Skeleton className="w-full h-[1px]" /> {/* Divider */}
                            <div className="flex flex-wrap gap-5">
                            <Skeleton className="w-20 h-8 rounded-full" /> {/* For tags */}
                            <Skeleton className="w-20 h-8 rounded-full" />
                            <Skeleton className="w-20 h-8 rounded-full" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

        </>
    );
}

export default PostDetailsLoader    