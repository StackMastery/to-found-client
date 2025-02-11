import { motion } from 'motion/react';

const HighlightHeading = ({className, children}) => {
    return (
        <>
            <div>
                <motion.h2 
                    animate={{opacity: 1, translateY: 0}}
                    initial={{opacity: 0, translateY: 10}}
                    className="text-3xl font-semibold pb-2">
                    {children}
                </motion.h2>
                <motion.span
                    animate={{width: 50, opacity: 1}}
                    initial={{opacity: 0}}
                    transition={{ duration: 0.5, delay: 0.2, ease: "linear" }}
                    className="bg-sky-600 w-0 h-[5px] flex">    
                </motion.span>
            </div>
        </>
    );
}

export default HighlightHeading