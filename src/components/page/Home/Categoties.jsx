import Button from "@/components/ui/Button";
import { CardStack } from "@/components/ui/card-stack";
import HighlightHeading from "@/components/ui/HighlightHeading";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categoties = () => {
  return (
    <>
      <section className="flex justify-center py-20 pt-40">
        <div className="w-primary inline-flex justify-center px-5 gap-10 items-center flex-col-reverse md:flex-row">
          <div className="w-full md:w-6/12 flex justify-center pt-10 md:pt-0">
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
        </div>
      </section>
    </>
  );
};

export default Categoties;

const REVIEWS = [
  {
    id: 0,
    name: "Alice Brown",
    designation: "Grateful User",
    content: (
      <p>
        I thought I’d never see my wallet again, but this platform proved me
        wrong. Thank you for making such a helpful service!
      </p>
    ),
  },
  {
    id: 1,
    name: "Michael Smith",
    designation: "Traveler",
    content: (
      <p>
        Lost my backpack at the airport. Found it within two days thanks to this
        amazing platform. Highly recommend it!
      </p>
    ),
  },
  {
    id: 2,
    name: "Sofia Martinez",
    designation: "Student",
    content: (
      <p>
        I misplaced my phone in the library. Someone listed it here, and I got
        it back the very next day. Such a lifesaver!
      </p>
    ),
  },
  {
    id: 3,
    name: "Liam Johnson",
    designation: "Teacher",
    content: (
      <p>
        Found a student’s ID card and used this platform to return it. The
        process was simple and effective!
      </p>
    ),
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Parent",
    content: (
      <p>
        My son lost his favorite toy at the park. We were so happy to find it
        listed here. This platform is a blessing!
      </p>
    ),
  },
  {
    id: 5,
    name: "Daniel Wilson",
    designation: "Pet Owner",
    content: (
      <p>
        Lost my dog’s collar during a walk. Someone found it and posted here.
        Such a thoughtful community!
      </p>
    ),
  },
];
