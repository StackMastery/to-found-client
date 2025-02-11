import { signOut } from "firebase/auth"
import { auth } from '@/firebase.config';
import toast from "react-hot-toast";
import { axiosSecure } from "./axiosSecure";

const Logout = ({msg}) => {
    signOut(auth)
        .then(() => {
            axiosSecure.get('/auth/logout')
                .then(() => {
                        toast.success(msg?.length > 1 ? msg : "Logout Successful");
                    })
        })
        .catch(() => {
            toast.error("Something went wrong");
        });
}

export default Logout