import Categoties from "@/components/page/Home/Categoties";
import Contact from "@/components/page/Home/Contact";
import Faqs from "@/components/page/Home/Faqs";
import LatestPosts from "@/components/page/Home/LatestPosts";
import Slider from "@/components/page/Home/Slider";
<<<<<<< HEAD
import { CreativePricing } from "@/components/ui/creative-pricing";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>To Found</title>
      </Helmet>
      <Slider />
      <LatestPosts />
      <Categoties />
      <Faqs />
      <CreativePricing />
      <Contact />
    </>
  );
};

export default Home;
=======
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>To Found</title>
            </Helmet>
            <Slider />
            <LatestPosts />
            <Categoties />
            <Faqs />
            <Contact />
        </>
    );
}

export default Home
>>>>>>> 2946a9bc95fa3b1e28333295a71c1f7472d717f5
