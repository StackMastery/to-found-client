import { axiosSecure } from "@/hooks/axiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CgMenuGridR } from "react-icons/cg";
import { VscThreeBars } from "react-icons/vsc";
import { Link, Links } from "react-router-dom";
import moment from "moment";
import { GoCheckCircleFill } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import Button from "@/components/ui/Button";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "motion/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SlEye } from "react-icons/sl";

const AllItem = () => {
  const postLimit = 10;

  const fetchPost = async ({ pageParam = 1 }) => {
    const { data } = await axiosSecure.get(
      `/post/all?pages=${pageParam}&limit=${postLimit}`
    );
    return data;
  };

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetchedPosts = allPages.flatMap((page) => page.posts).length;
      return totalFetchedPosts < lastPage.totalPosts
        ? lastPage.currentPage + 1
        : undefined;
    },
  });

  const [cardLayout, setcardLayout] = useState(true);
  const [allPosts, setallPosts] = useState();
  const [capTuredPost, setcapTuredPost] = useState();

  const captureData = () => {
    const aggregatedPosts = posts.pages.flatMap((page) => page.posts);
    setallPosts(aggregatedPosts);
    setcapTuredPost(aggregatedPosts);
  };

  useEffect(() => {
    if (posts) {
      captureData();
    }
  }, [posts]);

  const { ref: loadMoreRef, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handelSerach = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filter = capTuredPost.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue) ||
        post.category.toLowerCase().includes(searchValue) ||
        post.location.toLowerCase().includes(searchValue)
    );
    setallPosts(filter);
  };

  return (
    <>
      <Helmet>
        <title>All Posts | To Found</title>
      </Helmet>
      <section className="relative flex justify-center py-10 pt-28">
        <div className="px-5 w-primary">
          <div className="border px-5 py-2 border-b-sky-600 flex justify-between flex-wrap md:flex-nowrap gap-5 bg-white dark:bg-bgBlack dark:border-white/10 z-10">
            <div className="flex items-center gap-5 flex-grow md:flex-grow-0 flex-wrap md:flex-nowrap justify-between w-full">
              <motion.input
                onChange={handelSerach}
                type="text"
                placeholder="Search Post"
                className="px-5 w-full md:w-[500px] py-2 border rounded-md flex-grow md:flex-grow-0 dark:bg-transparent dark:border-white/20"
              />
              <div className="flex gap-2">
                <CgMenuGridR
                  onClick={() => setcardLayout(true)}
                  size={34}
                  className={`${
                    cardLayout ? "text-sky-600" : "text-neutral-500"
                  } cursor-pointer`}
                />
                <VscThreeBars
                  onClick={() => setcardLayout(false)}
                  size={34}
                  className={`${
                    !cardLayout ? "text-sky-600" : "text-neutral-400"
                  } cursor-pointer`}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 pt-10 w-full">
            {cardLayout && (
              <div
                className={`w-full gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
              >
                <React.Fragment>
                  {allPosts?.map((post, index) => (
                    <CardLayout post={post} />
                  ))}
                  {(isLoading || isFetchingNextPage) && <CardlayoutLoader />}
                </React.Fragment>
              </div>
            )}
          </div>
        </div>
      </section>
      {!cardLayout && (
        <section className="flex justify-center -mt-16">
          <div className="w-primary flex justify-center overflow-x-hidden px-5">
            <ScrollArea className="!w-full">
              <Table className="w-primary lg:w-full">
                <TableCaption>A list of all lost and found post</TableCaption>
                <TableHeader>
                  <TableRow className="dark:border-white/40">
                    <TableHead className="w-[150px]">Thumbnail</TableHead>
                    <TableHead className="w-[300px]">Post Title</TableHead>
                    <TableHead className="w-[250px]">Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Lost At</TableHead>
                    <TableHead>Posted At</TableHead>
                    <TableHead>Lost or found</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPosts?.map((post, index) => (
                    <TableLayout post={post} />
                  ))}
                  {(isLoading || isFetchingNextPage) && <TableLayoutLoader />}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" className="!flex" />
            </ScrollArea>
          </div>
        </section>
      )}
      <div ref={loadMoreRef} />
    </>
  );
};

export default AllItem;

const CardLayout = ({ post, ...props }) => {
  return (
    <>
      <motion.div
        whileHover={{ translateY: -10 }}
        className="col-span-1 w-full"
      >
        <Link to={`../post/${post._id}`}>
          <motion.img
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
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
              Catrgory - {post.category}
            </li>
            <li className="px-5 text-sm dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
              Type - {post.postType}
            </li>
            <li className="px-5 text-sm dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
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
                <p className="text-xs text-neutral-600">
                  {moment(post?.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <Link to={`../post/${post?._id}`}>
              <motion.div whileHover={{ scale: 0.9, rotate: 10 }}>
                <Button>View</Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const TableLayout = ({ post, ...props }) => {
  return (
    <TableRow className="text-neutral-600 dark:border-white/20">
      <TableCell className="z-10">
        <Link to={`../post/${post._id}`}>
          <motion.img
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileInView={{ opacity: 1 }}
            className="rounded-md z-[999999999] w-full h-[100px] object-cover"
            src={post.thumb}
            alt={post.title}
          />
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`../post/${post._id}`} className="hover:underline">
          {post.title.slice(0, 70)}
          {post.title.length > 70 && "..."}
        </Link>
      </TableCell>
      <TableCell>
        {post.location.slice(0, 40)}
        {post.location.length > 40 && "..."}
      </TableCell>
      <TableCell className="capitalize">{post.category}</TableCell>
      <TableCell className="capitalize">
        {moment(post.lostDate).fromNow()}
      </TableCell>
      <TableCell className="capitalize">
        {moment(post.createdAt).fromNow()}
      </TableCell>
      <TableCell className="capitalize">{post.postType}</TableCell>
      <TableCell className="capitalize">{post.authorName}</TableCell>
      <TableCell className="capitalize">
        <Link to={`../post/${post._id}`}>
          <SlEye
            size={25}
            className="p-1 bg-neutral-200 rounded-md hover:bg-sky-600 hover:text-white transition-all"
          />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const CardlayoutLoader = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <AnimatePresence>
          <motion.div exit={{ opacity: 0 }} key={index} className="col-span-1">
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
    </>
  );
};

const TableLayoutLoader = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <AnimatePresence>
          <TableRow exit={{ opacity: 0 }} className="text-neutral-600">
            <TableCell className="z-10">
              <Skeleton className="rounded-md w-full h-[100px] bg-gray-300" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell className="capitalize">
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell className="capitalize">
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell className="capitalize">
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell className="capitalize">
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell className="capitalize">
              <Skeleton className="h-6 bg-gray-300" />
            </TableCell>
            <TableCell className="capitalize">
              <Skeleton className="w-6 h-6 bg-gray-300" />
            </TableCell>
          </TableRow>
        </AnimatePresence>
      ))}
    </>
  );
};
