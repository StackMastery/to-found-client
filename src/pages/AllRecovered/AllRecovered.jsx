<<<<<<< HEAD
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
=======
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
import { AuthConext } from "@/context/AuthContext";
import { axiosSecure } from "@/hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
=======
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AllRecoveredLoader from "@/components/loaders/AllRecoveredLoader";
import { Helmet } from "react-helmet-async";

<<<<<<< HEAD
const AllRecovered = () => {
  const { authInfo } = useContext(AuthConext);

  const fetchAllRecoveredData = async () => {
    const { data } = await axiosSecure.get(
      `/post/all/recovered?email=${authInfo?.email}&uid=${authInfo.uid}`
    );
    return data;
  };

  const {
    data: recovered,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["recovered", authInfo?.email],
    queryFn: fetchAllRecoveredData,
  });

  if (isLoading) {
    return <AllRecoveredLoader />;
  }

  return (
    <>
      <Helmet>
        <title>My All Recovered Items | To Found</title>
      </Helmet>
      <section className="flex justify-center">
        <div className="w-primary px-5 inline-flex justify-start py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link to="/allRecovered">All Recovered</Link>
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
                  <TableHead className="w-[350px]">Post Title</TableHead>
                  <TableHead className="w-[350px]">
                    Given/Recived Location
                  </TableHead>
                  <TableHead>Losted At</TableHead>
                  <TableHead>Recover Date</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>View Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recovered?.length > 0 ? (
                  recovered?.map((tRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{tRow.postTitle}</TableCell>
                      <TableCell>{tRow.location}</TableCell>
                      <TableCell>
                        {moment(tRow.postLostDate).fromNow()}
                      </TableCell>
                      <TableCell>
                        {moment(tRow.recoverDate).fromNow()}
                      </TableCell>
                      <TableCell>{moment(tRow.createdAt).fromNow()}</TableCell>
                      <TableCell>
                        <Link
                          to={`/post/${tRow.postId}`}
                          className="underline hover:underline-offset-4"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>You have no items recovered </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" className="!flex" />
          </ScrollArea>
        </div>
      </section>
    </>
  );
};

export default AllRecovered;
=======

const AllRecovered = () => {

    const { authInfo } = useContext(AuthConext)

    const fetchAllRecoveredData = async () => {
        const { data } = await axiosSecure.get(`/post/all/recovered?email=${authInfo?.email}&uid=${authInfo.uid}`)
        return data
    }

    const {
        data: recovered,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['recovered', authInfo?.email],
        queryFn: fetchAllRecoveredData,
    })

    if(isLoading){
        return <AllRecoveredLoader />
    }


    return (
        <>
            <Helmet>
                <title>My All Recovered Items | To Found</title>
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
                                    <Link to="/allRecovered">All Recovered</Link>
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
                                        <TableHead className="w-[350px]">Post Title</TableHead>
                                        <TableHead className="w-[350px]">Given/Recived Location</TableHead>
                                        <TableHead>Losted At</TableHead>
                                        <TableHead>Recover Date</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>View Detail</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recovered.length > 0 ? recovered?.map((tRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell >{tRow.postTitle}</TableCell>
                                            <TableCell >{tRow.location}</TableCell>
                                            <TableCell >{moment(tRow.postLostDate).fromNow()}</TableCell>
                                            <TableCell >{moment(tRow.recoverDate).fromNow()}</TableCell>
                                            <TableCell >{moment(tRow.createdAt).fromNow()}</TableCell>
                                            <TableCell >
                                                <Link to={`/post/${tRow.postId}`} className="underline hover:underline-offset-4">
                                                    View Details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow >
                                            <TableCell>You have no items recovered </TableCell>
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

export default AllRecovered
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
