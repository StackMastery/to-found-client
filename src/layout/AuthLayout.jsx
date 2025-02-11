import Button from "@/components/ui/Button";
import Logo from "@/components/ui/logo";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import SocialLogin from "@/components/blocks/SocialLogin";
import { TfiBackLeft } from "react-icons/tfi";

const AuthLayout = () => {
  return (
    <>
      <section className="flex justify-center">
        <div className="inline-flex w-primary px-5 h-screen space-y-5 flex-col items-center py-40 justify-center">
          <div className="border w-full md:w-9/12 p-8 rounded-xl lg:w-[500px] dark:border-white/10">
            <div className="flex justify-between items-center">
              <Link to={"/"}>
                <Logo width="150" />
              </Link>
              <Link to={-1}>
                <Button className={`dark:text-white dark:bg-white/10`}>
                  <TfiBackLeft size={20} />
                </Button>
              </Link>
            </div>
            <span className="h-[1px] w-full flex bg-neutral-200 my-8 dark:bg-white/10"></span>
            <Outlet />
            <span className="h-[1px] w-full flex bg-neutral-200 my-8 dark:bg-white/10"></span>
            <SocialLogin />
          </div>
        </div>
      </section>
      <ScrollRestoration />
    </>
  );
};

export default AuthLayout;
