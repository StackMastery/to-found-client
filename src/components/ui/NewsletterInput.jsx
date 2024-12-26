import { axiosSecure } from "@/hooks/axiosSecure";
import { emailRegex } from "@/hooks/Regex";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const NewsletterInput = ({className}) => {

    const emailRef = useRef()
    const [isLoading, setisLoading] = useState(false);

    const handelSubscribe = async () => {
        setisLoading(true)
        if(!emailRegex.test(emailRef.current.value)){
            setisLoading(false)
            return toast.error('Enter a valid email')
        }

        await axiosSecure.post(`/subscribe?email=${emailRef.current.value}`)
            .then((res) => {
                toast.success('Email Subscribed')
            })
            .catch((err) => {
                return toast.error('Email Already Subscribed')
            })
            .finally(() => {
                setisLoading(false)
                emailRef.current.value = ''
            })
    }

    return (
        <>
            <div className={`bg-white flex flex-col md:flex-row items-stretch w-full md:w-fit rounded-xl shadow-sm ${className}`}>
            <input 
                ref={emailRef} 
                className="bg-transparent py-3 px-4 placeholder:text-sm text-sm border-b md:border-b-0 md:border-r border-gray-300 w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-sky-600" 
                placeholder="Enter email address" 
                type="email" 
            />
            <button 
                disabled={isLoading} 
                onClick={handelSubscribe} 
                className="flex items-center justify-center gap-2 bg-sky-600 py-3 px-4 w-full md:w-auto text-white font-medium hover:bg-sky-400 transition-all disabled:opacity-50 rounded-b-lg md:rounded-b-none md:rounded-r-xl"
            >
                Subscribe
                {isLoading && <ImSpinner2 size={15} className="animate-spin" />}
            </button>
            </div>
        </>
    );
}

export default NewsletterInput