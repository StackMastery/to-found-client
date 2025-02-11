import { axiosSecure } from "@/hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import {
  CiCalendar,
  CiCircleInfo,
  CiLocationOn,
  CiUser,
  CiWarning,
} from "react-icons/ci";
import { PiEnvelopeSimpleOpenThin, PiHeartBreakThin } from "react-icons/pi";
import PostDetailsLoader from "@/components/loaders/PostDetailsLoader";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { AuthConext } from "@/context/AuthContext";
import Modal from "@/components/ui/Modal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import NotFound from "../NotFound/NotFound";

const PostDetails = () => {
  const { id } = useParams();

  const [isOpneDetails, setisOpneDetails] = useState(false);
  const [date, setdate] = useState();
  const { authInfo } = useContext(AuthConext);
  const [isAnyError, setIsAnyError] = useState(false);
  const [isSuccesUpdate, setisSuccesUpdate] = useState(false);
  const [isLoadingSaving, setisLoadingSaving] = useState(false);

  const fetchPost = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/post/read?postid=${id}&uid=${authInfo?.uid}`
      );
      return data;
    } catch (error) {
      throw new Error("Error fetching post data");
    }
  };

  // tanstack
  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: fetchPost,
    retry: false,
  });

  const handelRecoverItem = async (e) => {
    e.preventDefault();
    setisLoadingSaving(true);

    const form = e.target;
    const location = form.location.value;

    if (!location) {
      setisLoadingSaving(false);
      return setIsAnyError("Enter a valid location");
    }
    if (!date) {
      setisLoadingSaving(false);
      return setIsAnyError("Select a new date");
    }
    if (post.isRecovered) {
      setisLoadingSaving(false);
      return setIsAnyError("This post already recovered");
    }
    setIsAnyError();

    await axiosSecure
      .post(
        `/post/add/recover?uid=${authInfo.uid}`,
        {
          ownerName: authInfo.displayName,
          ownerEmail: authInfo.email,
          postTitle: post.title,
          location: location,
          postId: post._id,
          postLostDate: post.lostDate,
          recoverDate: date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setisSuccesUpdate(true);
        refetch();
      })
      .finally(() => {
        setisLoadingSaving(false);
      });
  };

  if (isLoading) {
    return <PostDetailsLoader />;
  }

  if (isError || !post) {
    return <NotFound />;
  }

  return (
    <>
      <Modal
        isOpen={isSuccesUpdate}
        setisOpen={setisSuccesUpdate}
        title={"Item Recovered Succesfull"}
        des={"If you want to see your recover details click view recover"}
        button={"View Recover"}
        link={`../allRecovered`}
      />
      <Helmet>
        <title>{post?.title || ""} | To Found</title>
        <meta name="description" content={post?.des?.slice(0, 120)} />
      </Helmet>
      <section className="flex justify-center pt-16">
        <div className="w-primary px-5 inline-flex justify-start py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link to={`../post/${post?._id}`}>{post?.title}</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-primary gap-5 flex-col md:flex-row inline-flex px-5 py-10">
          <div className="space-y-5 w-full md:w-8/12">
            <div className="space-y-5">
              <div className="flex gap-3 items-center">
                <img width={40} src={post?.avatar} alt={post?.authorName} />
                <div>
                  <h4 className="capitalize font-normal flex items-center gap-2">
                    {post?.authorName}
                    <GoCheckCircleFill className="text-sky-600" />
                  </h4>
                  <p className="text-xs -mt-1 text-neutral-600 dark:text-white/80">
                    {moment(post?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <span className="w-full h-[1px] flex bg-neutral-500 dark:bg-white/30" />
              <h1 className="text-2xl sm:text-3xl py-3 md:text-4xl font-semibold">
                {post?.title}
              </h1>
            </div>
            <img
              className="w-full md:h-[350px] lg:h-[500px] rounded-xl object-cover"
              src={post?.thumb}
              alt={post?.title}
            />
            <div className="py-5">
              <p
                className="htmlShowcase text-neutral-800 dark:text-white"
                dangerouslySetInnerHTML={{ __html: post?.des }}
              />
            </div>
          </div>
          <div className="space-y-5 w-full md:w-4/12">
            <div className="fixed md:static w-full flex-col flex bottom-16 min-[380px]:bottom-[5.7rem] z-[9999] left-0">
              <div className="bg-white dark:bg-bgBlack dark:border-white/20 border rounded-t-2xl md:rounded-b-2xl p-5 shadow-sm w-full">
                <button
                  onClick={() => setisOpneDetails(!isOpneDetails)}
                  className="font-medium text-lg flex justify-between w-full items-center"
                >
                  See Details And Action
                  <IoIosArrowDown
                    size={25}
                    className={`${isOpneDetails && "-rotate-180"} md:hidden`}
                  />
                </button>
                <div
                  className={`${isOpneDetails ? "!block" : "hidden"} md:!block`}
                >
                  <div className="py-5">
                    <span className="w-full h-[1px] flex bg-neutral-500 dark:bg-white/30" />
                  </div>
                  <ul className="flex flex-wrap gap-5">
                    <li className="px-5 text-sm flex gap-2 dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                      <CiUser size={20} />
                      {post?.authorName || "N/A"}
                    </li>
                    <li className="px-5 text-sm flex gap-2 dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                      <CiLocationOn size={20} />
                      {post?.location || "N/A"}
                    </li>
                    <li className="px-5 text-sm flex gap-2 dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                      <PiEnvelopeSimpleOpenThin size={20} />
                      <span className={`${!post?.email && "!capitalize"}`}>
                        {post?.email || "N/A"}
                      </span>
                    </li>
                    <li className="px-5 text-sm flex gap-2 dark:border-white/20 dark:hover:bg-white/10 hover:bg-neutral-200/40 cursor-pointer py-1 rounded-full border w-fit">
                      <PiHeartBreakThin size={20} />
                      <span className="!capitalize">
                        {moment(post?.lostDate).fromNow() || "N/A"}
                      </span>
                    </li>
                  </ul>
                  {!post?.isRecovered ? (
                    <Dialog>
                      <DialogTrigger className="w-full" asChild>
                        <button className="px-5 py-2 bg-black hover:bg-black/90 w-full text-white mt-10 rounded-md dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white/80 dark:hover:border-white/20 border transition-all">
                          {post?.postType === "lost"
                            ? "Found This!"
                            : "This is Mine!"}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="w-full md:w-9/12 lg:w-[700px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {post?.postType === "lost"
                              ? "Return this item"
                              : "Recover this item"}
                          </DialogTitle>
                          <DialogDescription>
                            Fill the all of details and give a valid
                            given/received location
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handelRecoverItem}>
                          <div className="pt-5 flex justify-between gap-5">
                            <div className="flex-grow">
                              <label htmlFor="location" className="mb-1 flex">
                                Location
                              </label>
                              <Input
                                id="location"
                                name="location"
                                placeholder="Ex 132 My Street, Kingston"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-0 md:flex-grow w-full pt-5">
                            <label htmlFor="lostDate" className="mb-1 flex">
                              Date
                            </label>
                            <Popover>
                              <PopoverTrigger className="w-full items-center">
                                <div className="flex w-full justify-between items-center text-sm px-4 rounded-md py-2 border">
                                  {moment(date).format("MM/DD/YYYY")}
                                  <CiCalendar />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-fit p-0 border-none mx-5">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setdate}
                                  className="rounded-md border"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="pt-5 flex justify-between gap-5 flex-wrap md:flex-nowrap overflow-x-hidden max-w-full">
                            <div className="flex-grow w-full">
                              <label htmlFor="postype" className="mb-1 flex">
                                User
                              </label>
                              <div className="px-5 py-2 bg-slate-100 border rounded-md capitalize text-sm text-neutral-700 dark:bg-white/10 dark:text-white dark:border-white/20">
                                {authInfo?.displayName}
                              </div>
                            </div>
                            <div className="flex-grow w-full">
                              <label htmlFor="postype" className="mb-1 flex">
                                Email
                              </label>
                              <div className="px-5 py-2 bg-slate-100 border rounded-md text-sm text-neutral-700 dark:bg-white/10 dark:text-white dark:border-white/20">
                                {authInfo?.email}
                              </div>
                            </div>
                          </div>
                          <DialogFooter className={"!flex-col"}>
                            <div className="flex justify-between w-full items-center">
                              <div className="-mt-5">
                                <input
                                  required
                                  id="term&condition"
                                  type="checkbox"
                                />
                                <label
                                  htmlFor="term&condition"
                                  className="ml-2"
                                >
                                  Accept all <strong>Terms</strong> and{" "}
                                  <strong>Conditions</strong>
                                </label>
                              </div>
                              <button className="px-5 py-2 bg-black hover:bg-black/90 w-fit text-white mt-5 mb-10 rounded-md dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white/80 dark:hover:border-white/20 border transition-all">
                                Submit
                                {isLoadingSaving && (
                                  <CgSpinnerTwoAlt
                                    size={20}
                                    className="animate-spin"
                                  />
                                )}
                              </button>
                            </div>
                            {isAnyError && (
                              <div>
                                <div className="p-2 border flex gap-2 items-start rounded-md border-red-300 bg-red-100">
                                  <CiWarning size={20} color="red" />
                                  <div>
                                    <p className="text-red-600">{isAnyError}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="border p-2 mt-10 rounded-xl flex gap-2 dark:border-white/20">
                      <div>
                        <CiCircleInfo className="text-sky-600" size={25} />
                      </div>
                      <p>This item is already recovered. Notable to recover</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetails;
