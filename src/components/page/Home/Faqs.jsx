import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HighlightHeading from "@/components/ui/HighlightHeading";
import FaqImage from "@/assets/faq.webp";
import { motion } from "framer-motion";

const Faqs = () => {
  return (
    <>
      <section className="flex justify-center md:py-20">
        <div className="w-primary inline-flex justify-center px-5 gap-10 items-center flex-col md:flex-row-reverse">
          <div className="w-full md:w-6/12 justify-center hidden md:flex">
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              src={FaqImage}
              alt="Faq"
            />
          </div>
          <div className="w-full md:w-6/12 space-y-8">
            <HighlightHeading>Freequently Ask Faqs</HighlightHeading>
            <Accordion type="single" collapsible>
              {FaqsData &&
                FaqsData.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-start">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;

const FaqsData = [
  {
    question: "What is this platform about?",
    answer:
      "This platform is designed to help people report and find lost or found items. Whether you've lost something or found someone else’s belongings, you can use this platform to connect with others.",
  },
  {
    question: "How do I report a lost item?",
    answer:
      "Sign up or log in to your account. Click on the 'Report Lost Item' button. Fill in the details about your item, including a description, the date it was lost, and a photo (if available). Submit the report.",
  },
  {
    question: "How do I report a found item?",
    answer:
      "Sign up or log in to your account. Click on the 'Report Found Item' button. Provide details such as the item description, where and when it was found, and upload any relevant photos. Submit the report.",
  },
  {
    question: "Is there a fee to use this platform?",
    answer:
      "No, the platform is completely free to use for reporting and searching for lost or found items.",
  },
  {
    question: "How can I search for lost items?",
    answer:
      "Go to the 'Search' section, enter keywords related to your lost item, and browse the list of matching items reported by others.",
  },
  {
    question: "How do I contact someone who has found my item?",
    answer:
      "Once you find a matching item, click on it to view the details. Use the contact information provided by the finder to reach out and verify ownership.",
  },
];
