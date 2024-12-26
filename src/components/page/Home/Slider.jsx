import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import NewsletterInput from '@/components/ui/NewsletterInput';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import 'swiper/css/autoplay';
import { EffectFade, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

const SimpleSlider = () => {
  return (
    <section className='flex justify-center p-5'>
        <Swiper
            loop={true}
            slidesPerView={1}
            autoplay={{
                delay: 2000,  
                disableOnInteraction: false, 
                pauseOnMouseEnter: true,
            }}
            modules={[EffectFade, Autoplay]}
            effect={'fade'}
            className='swiperWidth bg-neutral-200 rounded-xl border items-center flex '
        >
            {SliderData && SliderData.map((slider, index) => (
                <SwiperSlide style={{backgroundImage: `url('${slider.bg}'`}} key={index} className='h-full bg-white'>
                    <div className='flex flex-row items-center h-full backdrop-blur-[6px] px-10 py-10 sm:px-14 md:px-20'>
                        <div className='space-y-4 w-full lg:w-7/12'>
                            <h2 className='text-2xl md:text-4xl font-semibold '>{slider.title}</h2>
                            <p className='text-sm md:text-base'>{slider.des.slice(0, 200)}</p>
                            {
                                slider.isNewsLetter ? (
                                    <div className='pt-5'>
                                        <NewsletterInput />
                                    </div>
                                )
                                : (
                                    <Link to={slider.link} className='pt-5 flex'>
                                        <motion.div
                                                whileHover={{
                                                    scale: 0.9,
                                                    rotate: -3,
                                                }}
                                            >
                                            <Button className={'bg-sky-600 border-sky-600 text-white hover:border-black'}>
                                                {slider.button}
                                            </Button>
                                        </motion.div>
                                    </Link>
                                )
                            }
                        </div>
                        <div className='lg:w-5/12 justify-center hidden lg:flex'>
                            <motion.img  width={slider.imgWidth} src={slider.img} alt={slider.title} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </section>
  );
};

export default SimpleSlider;

const SliderData = [
    {
      title: 'More than 1000 lost and found items posted',
      des: 'Explore an extensive collection of lost and found items, ranging from everyday belongings to unique treasures, all reported from various locations. Each item offers a chance for you to reconnect with something that may hold significant value or sentiment, now conveniently available for you to view and claim.',
      bg: 'https://img.freepik.com/free-vector/abstract-geometric-pattern-background_1319-242.jpg?t=st=1734855537~exp=1734859137~hmac=185260dd53705de320c23ce394b6a32f242f8d65983bff7403477023f477d8f7&w=740',
      img: 'https://res.cloudinary.com/dhuydj1lg/image/upload/v1734855221/d9mc3htovhfrzipa52i9.webp',
      isNewsLetter: true,
      imgWidth: 600,
    },
    {
      title: 'Thousands of items returned to their owners',
      des: 'Delve into the heartwarming stories of recovery as you browse through a diverse array of items that have successfully been reunited with their rightful owners through our dedicated platform. Each returned item reflects a moment of joy and relief, showcasing the impact of community engagement and responsible stewardship.',
      bg: 'https://img.freepik.com/free-photo/detailed-structure-marble-natural-pattern-background-design_1258-79100.jpg?t=st=1734855015~exp=1734858615~hmac=c0ead13e5de62ae8d09046b0db4bf3b244bdb2dbb89bdb3a3123daa682e1b6f1&w=740',
      img: 'https://res.cloudinary.com/dhuydj1lg/image/upload/v1734854679/wduu8blpxzsuvuznnq7s.webp',
      isNewsLetter: false,
      link: '/allitems',
      button: 'Browse Items',
      imgWidth: 500,
    },
    {
        title: 'Download Our App',
        des: 'Download Our Mobile App to Explore More',
    des: 'Experience the convenience of managing lost and found items right at your fingertips with our mobile app. Quickly browse through a vast inventory of posted items, receive real-time notifications about new listings, and easily connect with others to report or claim lost belongings. Our mobile app enhances your ability to stay informed and engaged within our community, making the process smoother and more efficient. Stay connected and be part of a network that values the importance of reclaiming what is rightfully yours or helping someone else find their lost treasures.',
        bg: 'https://img.freepik.com/free-photo/detailed-structure-marble-natural-pattern-background-design_1258-79100.jpg?t=st=1734855015~exp=1734858615~hmac=c0ead13e5de62ae8d09046b0db4bf3b244bdb2dbb89bdb3a3123daa682e1b6f1&w=740',
        img: 'https://res.cloudinary.com/dhuydj1lg/image/upload/v1734870355/arhc6zez7ctopzt0vlfs.webp',
        isNewsLetter: false,
        link: 'https://play.google.com/store/apps/details?id=learn.programming.courses&hl=en',
        button: 'Download App',
        imgWidth: 400,
      },
  ];
  