import { Input } from "@/components/ui/input";
import InputPass from "@/components/ui/InputPass";
import Upload from "@/hooks/Upload";
import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "@/assets/avatar.svg";
import { PiSpinnerThin } from "react-icons/pi";
import { generateRandomColor } from "@/components/layout/Header";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import Button from "@/components/ui/Button";
import {
  emailRegex,
  lengthRegex,
  lowercaseRegex,
  uppercaseRegex,
} from "@/hooks/Regex";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase.config";
import { AuthConext } from "@/context/AuthContext";
import firebaseErrorMessages from "@/hooks/friebaseErrors";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [isUploading, setisUploading] = useState(false); // Image upload
  const [isRegisterLoading, setisRegisterLoading] = useState(false); //  Register Loading State
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Context
  const { authInfo, setAuthInfo } = useContext(AuthConext);

  // Handeling Avatar Upload
  const handelAvatarupload = async (e) => {
    const avatar = e.target.files[0]; //Avatar
    setisUploading(true); // To Show loading in ui

    if (
      avatar.type !== "image/png" &&
      avatar.type !== "image/jpeg" &&
      avatar.type !== "image/svg+xml"
    ) {
      setisUploading(false);
      return toast.error("Only JPG, PNG, and SVG are allowed");
    }

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400, //Compressing Limit
        useWebWorker: true,
      };

      const compressedImage = await imageCompression(avatar, options); // Compresseing

      Upload(compressedImage) // Uploading
        .then((res) => {
          toast.success("Avatar Upload Succes");
          setisUploading({ data: res.secure_url });
        })
        .catch((error) => {
          toast.error(`Something went wrong`);
        });
    } catch (err) {
      toast.error(`Something went wrong`);
      return setisUploading(false);
    }
  };

  const handelRegistration = (e) => {
    e.preventDefault(); //
    const form = e.target;
    setisRegisterLoading(true);

    // Form Fields
    const password = form.userPassword.value; // Password
    const email = form.userEmail.value; // Email Address
    const name = form.userName.value; // Username

    // name validation
    if (!name) {
      setisRegisterLoading(false);
      return toast.error("Enter a name first");
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      setisRegisterLoading(false);
      return toast.error("Enter a valid email");
    }

    // Password Validation
    if (!uppercaseRegex.test(password)) {
      setisRegisterLoading(false);
      return toast.error(`Password must uppercase`);
    }
    if (!lowercaseRegex.test(password)) {
      setisRegisterLoading(false);
      return toast.error(`Password must lowercase`);
    }
    if (!lengthRegex.test(password)) {
      setisRegisterLoading(false);
      return toast.error(`Password legth must 6`);
    }
    if (!isUploading.data) {
      setisRegisterLoading(false);
      toast.error("Upload a avatar");
    }

    // Register
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: `${isUploading.data}`,
        })
          .then((res) => {
            toast.success("Register Succesfull");
            setAuthInfo({
              ...authInfo,
              displayName: name,
              photoURL: isUploading?.data,
            });
          })
          .catch((err) => {
            toast.error(firebaseErrorMessages[err.code]);
          });
      })
      .catch((err) => {
        toast.error(firebaseErrorMessages[err.code]);
      })
      .finally(() => {
        setisRegisterLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register | To Found</title>
      </Helmet>
      <div className="space-y-1 ">
        <h2 className="text-3xl">Register</h2>
        <p className="text-neutral-700">
          Wellcome to ToFound please register to continue
        </p>
      </div>
      <form onSubmit={handelRegistration} className="pt-5 flex flex-col gap-3">
        <Input name="userName" type="text" placeholder="Name" ref={nameRef} />
        <Input type="email" name="userEmail" placeholder="Email" />
        <InputPass autoComplete="new-password" name="userPassword" />
        <div className="border rounded-xl mt-3 dark:border-white/10">
          <input
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handelAvatarupload}
            type="file"
            id="avatar"
            style={{ display: "none" }}
          />
          <label
            htmlFor="avatar"
            className="flex gap-3 cursor-pointer px-5 py-2 w-full justify-between items-center"
          >
            <div className="flex items-center gap-5">
              {!isUploading?.data ? (
                <img
                  width={40}
                  height={40}
                  src={Avatar}
                  alt="Avatar"
                  className="w-10 h-10 object-cover rounded-full ring-2 ring-green-400"
                />
              ) : (
                <img
                  src={isUploading?.data}
                  alt="Avatar"
                  className="w-10 h-10 object-cover rounded-full ring-2 ring-green-400"
                />
              )}
              <div className="py-1">
                <h3 className="text-md">
                  {isUploading?.data ? "Avatar uploaded" : "Upload avatar"}
                </h3>
                <p className="text-sm text-neutral-600 -mt-1">
                  {isUploading?.data ? (
                    <span className="bg-green-600 text-green-100 px-2 rounded-full text-xs py-0">
                      success
                    </span>
                  ) : isUploading === true ? (
                    "uploading"
                  ) : (
                    "upload"
                  )}
                </p>
              </div>
            </div>
            {isUploading === true && (
              <PiSpinnerThin
                size={24}
                className="animate-spin"
                color={generateRandomColor()}
              />
            )}
          </label>
        </div>
        <div className="flex gap-5 justify-between mt-2 flex-col w-full">
          <p className="text-neutral-800 dark:text-white">
            Already have an account
            <br />
            <Link className="text-sky-600 font-semibold" to={"/auth/login"}>
              Login
            </Link>
          </p>
          <Button
            disabled={isRegisterLoading}
            className={"w-full flex justify-center"}
          >
            {isRegisterLoading ? (
              <PiSpinnerThin
                size={24}
                className="animate-spin"
                color={generateRandomColor()}
              />
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
