import PatterBg from "@/assets/pattern.webp";
import Email from "@/assets/email.webp";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <section className="flex justify-center pt-20">
        <div className="w-primary px-5 py-20">
          <div
            style={{ backgroundImage: `url('${PatterBg}')` }}
            className="flex dark:border-white/10 border gap-40 dark:!bg-none flex-col md:flex-row justify-between bg-blue-500/30/home/labib/Downloads/email.webp bg-cover bg-center p-10 md:p-20 rounded-2xl"
          >
            <div className="w-full md:w-5/12 hidden md:block">
              <motion.img
                whileInView={{
                  scale: 1,
                }}
                initial={{
                  scale: 0.7,
                }}
                transition={{ duration: 0.3 }}
                src={Email}
                alt="Email"
              />
            </div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              className=" w-full md:w-7/12 md:-mt-52"
            >
              <form className="bg-white dark:bg-black dark:backdrop-blur-lg dark:border-white/20 p-10 border rounded-2xl space-y-5">
                <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">
                  <div className="space-y-2 w-full">
                    <label htmlFor="name" className="text-lg font-medium">
                      Your Name
                    </label>
                    <Input
                      className="py-6 rounded-xl "
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <label htmlFor="email" className="text-lg font-medium">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      className="py-6 rounded-xl "
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">
                  <div className="space-y-2 w-full">
                    <label htmlFor="name" className="text-lg font-medium">
                      Location
                    </label>
                    <Input
                      className="py-6 rounded-xl"
                      placeholder="Ex Washing, Tong"
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <label htmlFor="name" className="text-lg font-medium">
                      Phone
                    </label>
                    <Input
                      type="number"
                      className="py-6 rounded-xl "
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5">
                  <div className="space-y-2 w-full flex flex-col">
                    <label htmlFor="name" className="text-lg font-medium">
                      Message
                    </label>
                    <textarea className="py-6 rounded-xl bg-transparent dark:border-white/10 focus:ring-2 border ring-white/30 p-5" />
                  </div>
                </div>
                <div>
                  <motion.button
                    whileHover={{
                      scale: 0.9,
                      rotate: 5,
                    }}
                    className="bg-sky-600 text-white px-8 py-3 text-lg rounded-xl"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
