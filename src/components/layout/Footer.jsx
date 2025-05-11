import { Link } from "react-router-dom";
import Logo from "../ui/logo";
import { generateRandomColor } from "./Header";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { useRef, useState } from "react";
import { axiosSecure } from "@/hooks/axiosSecure";
import { Input } from "../ui/input";
import { emailRegex } from "@/hooks/Regex";
import toast from "react-hot-toast";
import Button from "../ui/Button";
<<<<<<< HEAD
import { motion } from "motion/react";

const Footer = () => {
  const emailRef = useRef();
  const [isLoading, setisLoading] = useState(false);

  const handelSubscribe = async () => {
    setisLoading(true);
    if (!emailRegex.test(emailRef.current.value)) {
      setisLoading(false);
      return toast.error("Enter a valid email");
    }

    await axiosSecure
      .post(`/subscribe?email=${emailRef.current.value}`)
      .then((res) => {
        toast.success("Email Subscribed");
      })
      .catch((err) => {
        return toast.error("Email Already Subscribed");
      })
      .finally(() => {
        setisLoading(false);
        emailRef.current.value = "";
      });
  };

  return (
    <>
      <footer className="flex justify-center border-t mt-20 pb-10 lg:pb-0 dark:border-white/10">
        <div className="w-primary px-5 grid p-20 grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="space-y-5 col-span-1">
            <Link to={"/"}>
              <Logo width="140" />
            </Link>
            <p className="text-sm text-neutral-600 dark:text-white/80">
              To Found is a platform for reuniting lost items. Users can report
              losses and search for found belongings in their..
            </p>
          </div>
          <div className="space-y-5 col-span-1">
            <h3 className="font-semibold text-xl">Usefull Links</h3>
            <ul className="space-y-2">
              {QuickLinksData &&
                QuickLinksData.map((li, index) => (
                  <li key={index}>
                    <Link
                      to={li.path}
                      className="transition-all hover:text-[var(--hover-color)] au after:bg-[var(--hover-color)]"
                      style={{
                        "--hover-color": generateRandomColor(),
                      }}
                    >
                      {li.pathName}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-5 col-span-1">
            <h3 className="font-semibold text-xl">Follow Us</h3>
            <ul className="space-y-3">
              {FollowUsData &&
                FollowUsData.map((li, index) => (
                  <li key={index}>
                    <Link
                      to={li.link}
                      className="transition-all group flex items-center gap-2 hover:text-[var(--hover-color)]"
                      style={{
                        "--hover-color": generateRandomColor(),
                      }}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xl p-2 rounded-full border dark:border-white/20 flex w-fit"
                      >
                        {li.icon}
                      </motion.span>
                      <span className="au group-hover:after:w-full after:bg-[var(--hover-color)]">
                        {li.name}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-5 col-span-1 w-full">
            <h3 className="font-semibold text-xl">Subscribe</h3>
            <p className="text-sm text-neutral-600">
              Subscribe to our newsletter to gte latest updatest
            </p>
            <div className="flex items-center gap-5">
              <Input placeholder="Enter Email" type="email" ref={emailRef} />
              <Button onClick={handelSubscribe}>Subscribe</Button>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-5 border-t w-full justify-center text-start px-5 lg:text-center pb-28 lg:pb-5 dark:border-white/10">
        <p>
          Copyright &copy; {new Date().getFullYear()} <strong>To Found</strong>{" "}
          all right reserves
        </p>
      </div>
    </>
  );
};

export default Footer;

const QuickLinksData = [
  { path: "/", pathName: "Home" },
  { path: "/allItems", pathName: "Lost & Found Items" },
  { path: "/addItems", pathName: "Add founds & lost" },
  { path: "/allRecovered", pathName: "All recovered items" },
  { path: "/myitems", pathName: "My items" },
];

const FollowUsData = [
  {
    icon: <FaFacebookF />,
    name: "Facebook",
    link: "https://www.facebook.com/programmingherowebcourse",
  },
  {
    icon: <FaYoutube />,
    name: "YouTube",
    link: "https://www.youtube.com/c/ProgrammingHeroCommunity",
  },
  {
    icon: <FaLinkedinIn />,
    name: "Linkedin",
    link: "https://www.linkedin.com/company/programminghero/",
  },
];
=======
import { motion } from 'motion/react';

const Footer = () => {

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
            <footer className="flex justify-center border-t mt-20 pb-10 lg:pb-0">
                <div className="w-primary px-5 grid p-20 grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    <div className="space-y-5 col-span-1">
                        <Link to={'/'}>
                            <Logo width="140"/>
                        </Link>
                        <p className="text-sm text-neutral-600">To Found is a platform for reuniting lost items. Users can report losses and search for found belongings in their..</p>
                    </div>
                    <div className="space-y-5 col-span-1">
                        <h3 className="font-semibold text-xl">Usefull Links</h3>
                        <ul className="space-y-2">
                            {QuickLinksData && QuickLinksData.map((li, index) => (
                                <li key={index}>
                                    <Link 
                                        to={li.path}
                                        className="transition-all hover:text-[var(--hover-color)] au after:bg-[var(--hover-color)]"
                                        style={{
                                            '--hover-color': generateRandomColor(),
                                        }}
                                    >
                                        {li.pathName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-5 col-span-1">
                        <h3 className="font-semibold text-xl">Follow Us</h3>
                        <ul className="space-y-3">
                            {FollowUsData && FollowUsData.map((li, index) => (
                                <li key={index}>
                                    <Link 
                                        to={li.link}
                                        className="transition-all group flex items-center gap-2 hover:text-[var(--hover-color)]"
                                        style={{
                                            '--hover-color': generateRandomColor(),
                                        }}
                                    >
                                        <motion.span 
                                            whileHover={{scale: 1.1}}
                                            className="text-xl p-2 rounded-full border flex w-fit">
                                            {li.icon}
                                        </motion.span>
                                        <span className="au group-hover:after:w-full after:bg-[var(--hover-color)]">{li.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-5 col-span-1 w-full">
                        <h3 className="font-semibold text-xl">Subscribe</h3>
                        <p className="text-sm text-neutral-600">Subscribe to our newsletter to gte latest updatest</p>
                        <div  className="flex items-center gap-5">
                            <Input placeholder="Enter Email" type="email" ref={emailRef} />
                            <Button onClick={handelSubscribe} >Subscribe</Button>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="py-5 border-t w-full justify-center text-start px-5 lg:text-center pb-28 lg:pb-5">
                    <p>Copyright &copy; {new Date().getFullYear()} <strong>To Found</strong> all right reserves</p>
            </div>
        </>
    );
}

export default Footer


const QuickLinksData = [
    {path: '/', pathName: 'Home'},
    {path: '/', pathName: 'Add founds & lost'},
    {path: '/', pathName: 'All recovered items'},
    {path: '/', pathName: 'My items'},
]

const FollowUsData = [
    {
        icon: <FaFacebookF />,
        name: 'Facebook',
        link: 'https://www.facebook.com/programmingherowebcourse'
    },
    {
        icon: <FaYoutube />,
        name: 'YouTube',
        link: 'https://www.youtube.com/c/ProgrammingHeroCommunity'
    },
    {
        icon: <FaLinkedinIn />,
        name: 'Linkedin',
        link: 'https://www.linkedin.com/company/programminghero/'
    },
]
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
