import { generateRandomColor } from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import InputPass from "@/components/ui/InputPass";
import { auth } from "@/firebase.config";
import firebaseErrorMessages from "@/hooks/friebaseErrors";
import { emailRegex } from "@/hooks/Regex";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { PiSpinnerThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const Login = () => {
    const [isLoginLoading, setisLoginLoading] = useState();

    const handelLogin = (e) => {
        e.preventDefault()
        setisLoginLoading(true)

        const form = e.target
        const email = form.userEmail.value
        const password = form.userPassword.value

        if(!emailRegex.test(email)){
            setisLoginLoading(false)
            return toast.error(`Invalid email`)
        }
        if(!password){
            setisLoginLoading(false)
            return toast.error(`Enter valid password`)
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                toast.success('Register Succesfull')
            })
            .catch((err) => {
                toast.error(firebaseErrorMessages[err.code])
            })
            .finally(() => {
                setisLoginLoading(false)
            })
    }

    return (
        <>
            <Helmet>
                <title>Login | To Found</title>
            </Helmet>
            <div className="space-y-1 ">
                <h2 className="text-3xl">Login</h2>
                <p className="text-neutral-700">Wellcome back please login to continue</p>
            </div>
            <form onSubmit={handelLogin} className="pt-5 flex flex-col gap-3">
                <Input type="email" name="userEmail" placeholder="Email"/>
                <InputPass  name="userPassword"/>
                <div className="flex gap-5 justify-between mt-3">
                    <p className="text-neutral-800">
                        Did't have any account<br/>
                        <Link className="text-sky-600 font-semibold" to={'/auth/register'}>
                            Register
                        </Link>
                    </p>
                    <Button disabled={isLoginLoading} className={'w-fit text-black hover:text-white'}>
                        {isLoginLoading ? (
                            <PiSpinnerThin size={24} className="animate-spin"/>
                        ): 'Login'}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default Login