import Button from "@/components/ui/Button";
import HighlightHeading from "@/components/ui/HighlightHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosSecure } from "@/hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const LatestPosts = () => {
  const fetchLatestData = async () => {
    const { data } = await axiosSecure.get("/post/read/limit?limit=6");
    return data;
  };

  const { data: latestPost, isLoading } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: fetchLatestData,
  });

  return (
    <>
      <section className="flex justify-center">
        <div className="w-primary px-5 py-10 inline-flex flex-col justify-center">
          <div className="flex justify-between w-full">
            <HighlightHeading>Latest post</HighlightHeading>
          </div>
          <div className="w-full gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10">
            {!isLoading
              ? latestPost &&
                latestPost.map((post) => (
                  <React.Fragment key={post._id}>
                    <motion.div
                      whileHover={{ translateY: -10, zIndex: 999 }}
                      className="col-span-1 w-full"
                    >
                      <Link to={`../post/${post._id}`}>
                        <motion.img
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="w-full object-cover dark:border-white/20 hover:border-sky-600/30 transition-colors h-[350px] border rounded-xl sm:h-[330px] md:h-[270px] lg:h-[280px] object-center"
                          src={post.thumb}
                          alt={post.title}
                        />
                      </Link>
                      <div className="space-y-3 pt-5">
                        <Link
                          to={`../post/${post._id}`}
                          className="text-xl pt-3 w-fit flex hover:underline"
                        >
                          {post.title}
                        </Link>
                        <ul className="flex flex-wrap gap-3 py-3">
                          <li className="px-5 text-sm dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit ">
                            Category - {post.category}
                          </li>
                          <li className="px-5 text-sm dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                            Type - {post.postType}
                          </li>
                          <li className="px-5 text-sm dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit ">
                            Lost at - {moment(post.lostDate).fromNow()}
                          </li>
                        </ul>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center">
                            <img
                              width={40}
                              src={post?.avatar}
                              className="rounded-full"
                              alt={post?.authorName}
                            />
                            <div>
                              <h4 className="capitalize font-normal flex items-center gap-2">
                                {post?.authorName}
                                <GoCheckCircleFill className="text-sky-600" />
                              </h4>
                              <p className="text-xs text-neutral-600 dark:text-white/80">
                                {moment(post?.createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                          <Link to={`../post/${post?._id}`}>
                            <motion.div whileHover={{ scale: 0.9, rotate: 3 }}>
                              <Button>View</Button>
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </React.Fragment>
                ))
              : [...Array(6)].map((_, idx) => (
                  <AnimatePresence key={idx}>
                    <motion.div exit={{ opacity: 0 }} className="col-span-1">
                      <div className="w-full">
                        <Skeleton className="w-full h-[350px] sm:h-[330px] md:h-[270px] lg:h-[280px] rounded-xl" />
                      </div>
                      <div className="space-y-3 pt-5">
                        <Skeleton className="w-full h-6" />
                        <ul className="flex flex-wrap gap-3 py-3">
                          <li className="px-5 text-sm hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                            <Skeleton className="w-24 h-5" />
                          </li>
                          <li className="px-5 text-sm hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                            <Skeleton className="w-24 h-5" />
                          </li>
                          <li className="px-5 text-sm hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                            <Skeleton className="w-24 h-5" />
                          </li>
                        </ul>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div>
                              <Skeleton className="w-24 h-4" />
                              <Skeleton className="w-16 h-3 mt-2" />
                            </div>
                          </div>
                          <Skeleton className="w-20 h-8 rounded-md" />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestPosts;
