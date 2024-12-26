import NotFoundImage from '@/assets/404.png'
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';
 
const NotFound = () => {
    return (
        <>
            <section className="flex justify-center">
                <div className="w-primary px-5 py-20 h-screen items-center flex justify-center">
                    <div className='flex flex-col items-center text-center space-y-5'>
                        <img width={300} src={NotFoundImage} alt="Nopt Founsd" />
                        <h2 className='text-5xl font-semibold'>Oh no page not found!</h2>
                        <p className='text-neutral-700'>
                            We apologize for the inconvenience, but the page you’re looking for could<br /> not be found. Please go back to the previous page or return to the home <br/>page to continue browsing. Thank you for understanding!
                        </p>
                        <Link to={'/'}>
                            <motion.div>
                                <Button>
                                    Go To Homepage
                                </Button>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NotFound