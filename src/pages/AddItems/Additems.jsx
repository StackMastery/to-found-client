import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Upload from "@/hooks/Upload";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import { PiSpinnerThin } from "react-icons/pi";
import { Helmet } from "react-helmet-async";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/ui/TipTap";
import { AuthConext } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import { HiOutlinePlus } from "react-icons/hi";
import PreventPageLeave from "@/routes/PreventPageLeave";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";
import toast from "react-hot-toast";
import { axiosSecure } from "@/hooks/axiosSecure";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import Modal from "@/components/ui/Modal";

const Additems = () => {

    const [thumbnail, setthumbnail] = useState(false);
    const [content, setContent] = useState()
    const [isSaving, setisSaving] = useState(false);
    const [savedData, setsavedData] = useState();
    const { authInfo } = useContext(AuthConext)
    const [date, setdate] = useState();
    const [defaultContents, setdefaultContents] = useState();

    const handelThumbnailUpload = async (e) => {
        setthumbnail(true)
        const file = e.target.files[0]

        const options = {
            maxSizeMB: 1, 
            maxWidthOrHeight: 2000, //Compressing Limit
            useWebWorker: true
        };

        const compressedImage = await imageCompression(file, options) // Compresseing

        Upload(compressedImage)
            .then((res) => {
                setthumbnail({data: res.secure_url})
            })
            .catch((err) => {
                toast.error(`Something went wrong`)
            })
            .finally(() => {})
    }

    const addItem = (e) => {
        e.preventDefault()
        setisSaving(true)

        const form = e.target

        // Data
        const postType = form.postType.value
        const title = form.title.value
        const category = form.category.value
        const location = form.location.value

        if(!postType){
            setisSaving(false)
            return toast.error('Chose post type')
        }

        if(!category){
            setisSaving(false)
            return toast.error('Chose post category')
        }
        if(!title){
            setisSaving(false)
            return toast.error('Give a post title')
        }
        if(!date){
            setisSaving(false)
            return toast.error('Enter lost date')
        }
        if(!location){
            setisSaving(false)
            return toast.error('Enter lost location')
        }
        if(!thumbnail.data){
            setisSaving(false)
            return toast.error('Upload a thumbnail')
        }

        axiosSecure.post(
            `/post/add?uid=${authInfo.uid}`, 
            {
                authorName: authInfo.displayName,
                email: authInfo.email,
                title: title,
                location: location,
                thumb: thumbnail.data,
                des: content,
                category: category,
                postType: postType,
                avatar: authInfo.photoURL,
                lostDate: date
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            setisSaving(false)
            setsavedData(res.data)
            setthumbnail(false)
            form.reset()
        })
        .catch((err) => {
            setisSaving(false)
            return toast.error('Something went wrong')
        })
    } 

    return (
        <>
            <Helmet>
                <title>Add Items | To Found</title>
            </Helmet>
            <PreventPageLeave isEnabled={true} />   
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
                                    <Link to="/additems">Add Lost & Found Items</Link>
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <Modal 
                button={'View Post'} 
                setisOpen={setsavedData}
                title={'Post created succesfuly'}
                isOpen={savedData}
                link={`../post/${savedData?._id}`}
                des={'To preview your post click to view post'}
            />
            <section className="flex justify-center pt-20 pb-40">
                <div className="w-primary px-5 inline-flex justify-center">
                    <form onSubmit={addItem} className={`bg-cover bg-no-repeat bg-center w-full border p-10 md:w-9/12 lg:w-[900px] rounded-xl`}>
                        <div>
                            <input  accept="image/png, image/webp, image/avif, image/jpeg, image/svg+xml" disabled={thumbnail?.data} onChange={handelThumbnailUpload} type="file" id="thumbnail" className="hidden" />
                            <label style={{backgroundImage: `url('${thumbnail.data}')`}}  className="w-full bg-cover bg-center   flex-col gap-5 border-dashed border border-cyan-500/50 rounded-xl p-5 sm:p-14 md:p-20 flex items-center" htmlFor="thumbnail">
                                <div className="relative w-full group">
                                    
                                <div
                                    className="relative z-40 cursor-pointer bg-black/60 group-hover:translate-x-8 group-hover:shadow-2xl group-hover:-translate-y-8 transition-all duration-500 flex items-center justify-center h-32 w-32 mx-auto rounded-xl"
                                >
                                    {!thumbnail === true ? (
                                        <svg
                                            className="h-6 w-6 text-white/60"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                            <path d="M7 9l5 -5l5 5"></path>
                                            <path d="M12 4l0 12"></path>
                                        </svg>
                                    ) : thumbnail === true ? (
                                        <PiSpinnerThin size={24} color="white" className="animate-spin"/>
                                    ) : <span className="text-white text-4xl">&#10004;</span>}
                                    </div>
                                    <div
                                        className="absolute border opacity-0 group-hover:opacity-80 transition-all duration-300 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 w-32 mx-auto rounded-xl"
                                    ></div>
                                </div>
                                <h3 className="text-xl">{
                                    !thumbnail === true ? (
                                        'Upload thumbnai'
                                    )    
                                    : thumbnail === true ? (
                                        'Uploading..'
                                    )
                                    : 'Upload Succes'
                                }</h3>
                            </label>
                        </div>
                        <div className="pt-5 flex justify-between gap-5 flex-wrap md:flex-nowrap">
                            <div className="flex-grow-0 md:flex-grow w-full">
                                <label htmlFor="postype" className="mb-1 flex">Post type</label>
                                <Select name="postType" id="postype">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select post type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select</SelectLabel>
                                            <SelectItem value="lost">Lost</SelectItem>
                                            <SelectItem value="found">Found</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-grow-0 md:flex-grow w-full">
                                <label htmlFor="lostDate" className="mb-1 flex">Lost date</label>
                                <Popover>
                                    <PopoverTrigger className="w-full items-center">
                                        <div className="flex w-full justify-between items-center text-sm px-4 rounded-md py-2 border">
                                            {moment(date).format('MM/DD/YYYY')}
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
                            <div className="flex-grow-0 md:flex-grow w-full">
                                <label htmlFor="category" className="mb-1 flex">Category</label>
                                <Select name="category" id="category">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Select</SelectLabel>
                                            <SelectItem value="pets">Pets</SelectItem>
                                            <SelectItem value="people">People</SelectItem>
                                            <SelectItem value="documents">Documents</SelectItem>
                                            <SelectItem value="gadgets">Gadgets</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="pt-5 flex justify-between gap-5">
                            <div className="flex-grow">
                                <label htmlFor="title" className="mb-1 flex">Title</label>
                                <Input name="title" placeholder="Post title" id="title"/>
                            </div>
                        </div>
                        <div className="pt-5 flex justify-between gap-5">
                            <div className="flex-grow">
                                <label htmlFor="location" className="mb-1 flex">Location</label>
                                <Input id="location" name="location" placeholder="Ex 132 My Street, Kingston" />
                            </div>
                        </div>
                        <div className="pt-5 flex justify-between gap-5 flex-wrap md:flex-nowrap overflow-x-hidden max-w-full">
                            <div className="flex-grow w-full">
                                <label htmlFor="postype" className="mb-1 flex">Name</label>
                                <div className="px-5 py-2 bg-slate-100 border rounded-md capitalize text-sm text-neutral-700">{authInfo?.displayName}</div>
                            </div>
                            <div className="flex-grow w-full">
                                <label htmlFor="postype" className="mb-1 flex">Email</label>
                                <div className="px-5 py-2 bg-slate-100 border rounded-md lowercase text-sm text-neutral-700">{authInfo?.email}</div>
                            </div>
                        </div>
                        <div className="pt-5">
                            <Tiptap defaultContent={defaultContents} setContent={setContent} content={content}/>
                        </div>
                        <div className="w-full flex justify-end pt-5">
                            <Button className={'border-sky-600 hover:border-black bg-sky-600 font-medium text-white'}>
                                Add post {!isSaving === true ? <HiOutlinePlus /> : <CgSpinnerTwoAlt className="animate-spin"/>}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Additems