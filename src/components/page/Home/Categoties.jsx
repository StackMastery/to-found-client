import Button from "@/components/ui/Button";
import { CardStack } from "@/components/ui/card-stack";
import HighlightHeading from "@/components/ui/HighlightHeading";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { motion } from "framer-motion";
=======
import { motion } from 'framer-motion';

>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5

const Categoties = () => {
  return (
    <>
      <section className="flex justify-center py-20 pt-40">
        <div className="w-primary inline-flex justify-center px-5 gap-10 items-center flex-col-reverse md:flex-row">
<<<<<<< HEAD
          <div className="w-full h md:w-6/12 flex justify-center pt-10 md:pt-0">
            <CardStack items={REVIEWS} />
          </div>
          <div className="w-full md:w-6/12 space-y-8">
            <HighlightHeading>Our Some Clients Reviews</HighlightHeading>
            <p className="text-neutral-700 dark:text-white/80">
              Our platform has helped numerous clients recover lost items, from
              watches and purses to backpacks and keys. Many have expressed
              gratitude for the quick and effective assistance, highlighting the
              strong community support that makes these recoveries possible.
            </p>
            <Link to={"/additems"} className="flex">
              <motion.div>
                <Button>Get Started</Button>
              </motion.div>
            </Link>
          </div>
=======
            <div className="w-full md:w-6/12 flex justify-center pt-10 md:pt-0">
                <CardStack items={REVIEWS}/>
            </div>
            <div className="w-full md:w-6/12 space-y-8">
              <HighlightHeading>
                Our Some Clients Reviews
              </HighlightHeading>
              <p className="text-neutral-700">Our platform has helped numerous clients recover lost items, from watches and purses to backpacks and keys. Many have expressed gratitude for the quick and effective assistance, highlighting the strong community support that makes these recoveries possible.</p>
              <Link to={'/additems'} className="flex">
                <motion.div>
                  <Button>
                    Get Started
                  </Button>
                </motion.div>
              </Link>
            </div>
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
        </div>
      </section>
    </>
  );
<<<<<<< HEAD
};

export default Categoties;
=======
}

export default Categoties
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5

const REVIEWS = [
  {
    id: 0,
    name: "Alice Brown",
    designation: "Grateful User",
    content: (
      <p>
<<<<<<< HEAD
        I thought I’d never see my wallet again, but this platform proved me
        wrong. Thank you for making such a helpful service!
=======
        I thought I’d never see my wallet again, but this platform proved me wrong. Thank you for making such a helpful service!
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
      </p>
    ),
  },
  {
    id: 1,
    name: "Michael Smith",
    designation: "Traveler",
    content: (
      <p>
<<<<<<< HEAD
        Lost my backpack at the airport. Found it within two days thanks to this
        amazing platform. Highly recommend it!
=======
        Lost my backpack at the airport. Found it within two days thanks to this amazing platform. Highly recommend it!
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
      </p>
    ),
  },
  {
    id: 2,
    name: "Sofia Martinez",
    designation: "Student",
    content: (
      <p>
<<<<<<< HEAD
        I misplaced my phone in the library. Someone listed it here, and I got
        it back the very next day. Such a lifesaver!
=======
        I misplaced my phone in the library. Someone listed it here, and I got it back the very next day. Such a lifesaver!
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
      </p>
    ),
  },
  {
    id: 3,
    name: "Liam Johnson",
    designation: "Teacher",
    content: (
      <p>
<<<<<<< HEAD
        Found a student’s ID card and used this platform to return it. The
        process was simple and effective!
=======
        Found a student’s ID card and used this platform to return it. The process was simple and effective!
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
      </p>
    ),
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Parent",
    content: (
      <p>
<<<<<<< HEAD
        My son lost his favorite toy at the park. We were so happy to find it
        listed here. This platform is a blessing!
=======
        My son lost his favorite toy at the park. We were so happy to find it listed here. This platform is a blessing!
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
      </p>
    ),
  },
  {
    id: 5,
    name: "Daniel Wilson",
    designation: "Pet Owner",
    content: (
      <p>
<<<<<<< HEAD
        Lost my dog’s collar during a walk. Someone found it and posted here.
        Such a thoughtful community!
=======
        Lost my dog’s collar during a walk. Someone found it and posted here. Such a thoughtful community!
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
      </p>
    ),
  },
];
