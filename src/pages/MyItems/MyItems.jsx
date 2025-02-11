import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/axiosSecure";
import { useContext, useState } from "react";
import { AuthConext } from "@/context/AuthContext";
import moment from "moment";
import AllRecoveredLoader from "@/components/loaders/AllRecoveredLoader";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { copyToClipBoard } from "@/hooks/copyToClipBoard";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { ImSpinner2 } from "react-icons/im";
import NotFound from "../NotFound/NotFound";

const MyItems = () => {

    const { authInfo } = useContext(AuthConext)

    const fetchAllMyPostedData = async () => {
        const { data } = await axiosSecure.get(`/post/read/my?uid=${authInfo.uid}&email=${authInfo.email}`)
        return data
    }

    const {
        data: myposts,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['myposts'],
        queryFn: fetchAllMyPostedData
    })

    const [isAnyDeleteError, setisAnyDeleteError] = useState();
    const [isDeleting, setisDeleting] = useState(false);
    const [isSucces, setisSucces] = useState();


    const handelDelete = async (id, e) => {
        setisDeleting(true)
        const matchID = e.target.matchID.value

        if(id !== matchID){
            setisDeleting(false)
            return toast.error('Delete id not mathched')
        }

        await axiosSecure.delete(
            `/post/delete?uid=${authInfo.uid}&postid=${id}`
        ).then((res) => {
            setisSucces(true)
            return toast.success('Post delete succesfull')
        })
        .catch(() => {
            toast.error('Something went wrong to delete post')
        })
        .finally(() => {
            setisDeleting(false)
        })
    }

    if(isLoading){
        return <AllRecoveredLoader />
    }

    if(isError){
        return <NotFound />
    }

    return (
        <>
            <Helmet>
                <title>My Posted Items | To Found</title>
            </Helmet>
            <section className="flex justify-center">
                <div className="w-primary px-5 inline-flex justify-start py-5">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link to={'/'}>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    <Link to="/myitems">My Items</Link>
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="flex justify-center w-full pb-20 pt-10">
                <div className="w-primary flex justify-center overflow-x-hidden px-5">
                        <ScrollArea className="!w-full">
                            <Table className="w-primary lg:w-full">
                                <TableCaption>A list of your all recovered items</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Post Title</TableHead>
                                        <TableHead className="w-[300px]">Description</TableHead>
                                        <TableHead>Recovered</TableHead>
                                        <TableHead>Lost Date</TableHead>
                                        <TableHead>Posted At</TableHead>
                                        <TableHead>Update</TableHead>
                                        <TableHead>Delete</TableHead>
                                        <TableHead>View Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myposts?.length > 0 ? myposts?.map((tRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell >{tRow.title}</TableCell>
                                            <TableCell className="flex gap-1 flex-wrap">
                                                <p 
                                                    className="htmlShowcase text-neutral-800 w-fit"
                                                    dangerouslySetInnerHTML={{ __html: tRow?.des.slice(0, 35) }}
                                                />
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="underline">
                                                            See more..
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogHeader>
                                                        <DialogTitle></DialogTitle>
                                                    </DialogHeader>
                                                    <DialogContent className="h-[90vh] overflow-y-auto">
                                                        <p
                                                            className="htmlShowcase text-neutral-800 w-fit"
                                                            dangerouslySetInnerHTML={{ __html: tRow?.des}}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                            <TableCell >
                                                {tRow.isRecovered ? (
                                                    <span className="bg-sky-600 text-white px-2 rounded-full">&#10003;</span>
                                                ) : (
                                                    <span className="bg-red-500 text-white px-2 rounded-full">
                                                        &#10006;
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell >{moment(tRow.lostDate).fromNow()}</TableCell>
                                            <TableCell >{moment(tRow.createdAt).fromNow()}</TableCell>
                                            <TableCell >
                                                <Link to={`../post/update/${tRow._id}`} className="bg-neutral-200 p-2 rounded-md flex w-fit hover:bg-green-400 hover:text-white transition-colors">
                                                    <CiEdit size={20} />
                                                </Link>
                                            </TableCell>
                                            <TableCell >
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="bg-neutral-200 p-2 rounded-md hover:bg-red-600 hover:text-white transition-colors">
                                                    <CiTrash size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    {!isSucces ? (
                                                    <>
                                                        <DialogHeader>
                                                            <DialogTitle className="text-2xl">
                                                                Are you sure?
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                If you want to delete this item, type this code{" "}
                                                                <strong onClick={() => copyToClipBoard(tRow._id)} className="cursor-pointer">
                                                                {tRow._id}
                                                                </strong>{" "}
                                                                to verify.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            handelDelete(tRow._id, e);
                                                        }}
                                                        >
                                                        <Input name="matchID" className="text-sm" autoFocus />
                                                        <div className="flex justify-center sm:justify-start">
                                                            <button className="flex mt-5 gap-2 items-center bg-red-600 text-white px-5 py-2 rounded-md">
                                                                Delete
                                                                {isDeleting && <ImSpinner2 size={20} className="animate-spin"/>}
                                                            </button>
                                                        </div>
                                                        </form>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <DialogHeader className={'hidden'}>
                                                            <DialogTitle className="text-2xl">
                                                                
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex justify-center">
                                                            <svg width='72' height='68' viewBox='0 0 72 68' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M68.1715 39.9631L68.1505 39.9735C65.6826 41.8661 64.6369 45.0869 65.5154 48.0673L65.5258 48.0882C66.927 52.8253 63.4553 57.6041 58.5194 57.7296H58.4986C55.3823 57.8133 52.6425 59.8001 51.6073 62.7386V62.749C49.9549 67.4128 44.3292 69.2427 40.2614 66.4297C37.7355 64.7049 34.3963 64.6149 31.7388 66.4297H31.7284C27.6607 69.2322 22.0347 67.4127 20.3929 62.7384C19.3483 59.7926 16.6126 57.813 13.5017 57.7295H13.4807C8.54508 57.6039 5.07319 52.8252 6.47452 48.0881L6.48492 48.0671C7.36312 45.0867 6.31744 41.866 3.84975 39.9733L3.8288 39.9629C-0.0926719 36.9512 -0.0926719 31.0535 3.8288 28.0419L3.84975 28.0315C6.31744 26.1388 7.36312 22.9179 6.47452 19.9376V19.9167C5.06264 15.1797 8.54494 10.4007 13.4807 10.2753H13.5017C16.6074 10.1916 19.3576 8.20474 20.3929 5.26638V5.25598C22.0345 0.592147 27.6607 -1.23781 31.7284 1.57526H31.7388C34.3007 3.34249 37.6888 3.34249 40.2614 1.57526C44.3701 -1.26213 49.9646 0.620132 51.6073 5.25598V5.26638C52.6425 8.19433 55.3822 10.1918 58.4986 10.2753H58.5194C63.4552 10.4007 66.927 15.1797 65.5258 19.9167L65.5154 19.9376C64.6369 22.9179 65.6826 26.1388 68.1505 28.0315L68.1715 28.0419C72.093 31.0535 72.093 36.9513 68.1715 39.9631Z' fill='#3EB655'/><path d='M36.0004 53.479C46.7584 53.479 55.4794 44.7579 55.4794 34C55.4794 23.2421 46.7584 14.5211 36.0004 14.5211C25.2425 14.5211 16.5215 23.2421 16.5215 34C16.5215 44.7579 25.2425 53.479 36.0004 53.479Z' fill='#8BD399'/><path opacity='0.1' d='M50.9569 21.5312C47.5876 18.7595 43.2771 17.0935 38.5779 17.0935C27.8201 17.0935 19.0943 25.8193 19.0943 36.5771C19.0943 41.2762 20.7603 45.5868 23.5319 48.956C19.2511 45.3851 16.5244 40.0137 16.5244 33.9997C16.5244 23.2417 25.2427 14.5236 36.0006 14.5236C42.0145 14.5236 47.386 17.2503 50.9569 21.5312Z' fill='black'/><path d='M31.3659 41.6256L27.0584 37.0429C25.9303 35.8425 25.9886 33.9552 27.1885 32.8271C28.3885 31.6976 30.2766 31.7582 31.4037 32.9577L33.46 35.1444L42.2002 25.1547C43.2836 23.915 45.168 23.7893 46.4087 24.8742C47.6485 25.9591 47.7736 27.8429 46.6893 29.0827L35.7831 41.547C34.6212 42.8735 32.5708 42.9082 31.3659 41.6256Z' fill='white'/></svg>
                                                        </div>
                                                        <div className="text-center space-y-1">
                                                        <h2 className="text-2xl">Post Deleted Successfully</h2>
                                                        </div>
                                                        <DialogClose>
                                                            <div onClick={() => {
                                                                setisSucces(false)
                                                                refetch()
                                                            }} className="px-5 py-2 border rounded-md hover:bg-black hover:text-white">Close</div>
                                                        </DialogClose>
                                                    </>
                                                    )}
                                                </DialogContent>
                                            </Dialog>

                                            </TableCell>
                                            <TableCell >
                                                <Link to={`/post/${tRow._id}`} className="underline hover:underline-offset-4">
                                                    View Details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow >
                                            <TableCell>You have no items posted</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" className="!flex"/>
                        </ScrollArea>
                </div>
            </section>
        </>
    );
}

export default MyItems