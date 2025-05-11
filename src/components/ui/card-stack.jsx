<<<<<<< HEAD
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
=======
"use client";;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval;

export const CardStack = ({
  items,
  offset,
  scaleFactor
}) => {
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
<<<<<<< HEAD
    <div className="relative  h-60 w-full md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
=======
    (<div className="relative  h-60 w-full md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          (<motion.div
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
            key={index}
            className="absolute dark:bg-black bg-white h-60 w-full md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between dark:border-neutral-800"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
<<<<<<< HEAD
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div className="flex -mb-10">
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
            </div>
=======
            }}>
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
<<<<<<< HEAD
          </motion.div>
        );
      })}
    </div>
=======
          </motion.div>)
        );
      })}
    </div>)
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
  );
};
