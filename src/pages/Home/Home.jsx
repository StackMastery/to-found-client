import Categoties from "@/components/page/Home/Categoties";
import Contact from "@/components/page/Home/Contact";
import Faqs from "@/components/page/Home/Faqs";
import LatestPosts from "@/components/page/Home/LatestPosts";
import Slider from "@/components/page/Home/Slider";
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