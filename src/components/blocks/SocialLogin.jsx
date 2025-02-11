import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { PiSpinnerThin } from "react-icons/pi";
import { generateRandomColor } from "../layout/Header";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase.config";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const [isAuthenticating, setisAuthenticating] = useState(false);

  const googleAuth = () => {
    setisAuthenticating(true);

    const googleAuthProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleAuthProvider).then((res) => {
      toast.success("login Succesfull");
    });
  };

  return (
    <>
      <div>
        <button
          onClick={googleAuth}
          disabled={isAuthenticating}
          className="w-full px-5 py-3 dark:border-white/10 border flex justify-center gap-5 rounded-xl focus:rounded-full focus:bg-neutral-100"
        >
          {!isAuthenticating ? (
            <>
              <FcGoogle size={26} />
              Continue with google
            </>
          ) : (
            <>
              <PiSpinnerThin
                size={26}
                className="animate-spin"
                color={generateRandomColor()}
              />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
