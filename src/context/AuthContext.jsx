import { linkWithCredential, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { auth } from '@/firebase.config';
import { axiosSecure } from "@/hooks/axiosSecure";
import axios from "axios";

const AuthConext = createContext() // Created Auth Context

const AuthContextProvider = ({children}) => {

    const [authInfo, setAuthInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                axiosSecure
                    .post(
                    '/auth/create',
                    { uid: user.uid },
                    {
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                    )
                    .then((res) => {
                        setAuthInfo(user);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        signOut(auth)
                        setIsLoading(false);
                    });
                               
            }else{
                setAuthInfo(null)
                setIsLoading(false)
            }
        })

        return () => unSubscribe()
    }, [setAuthInfo, authInfo]);

    return(
        <AuthConext.Provider 
            value={{
                authInfo, setAuthInfo,
                isLoading, setIsLoading
            }}>
            {children}
        </AuthConext.Provider>
    )
}

export { AuthConext, AuthContextProvider }