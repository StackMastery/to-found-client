import Layout from "@/layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout';
import Register from "@/pages/Auth/Register";
import PublicRoutes from "./Public.routes";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/Home/Home";
import PrivateRoutes from "./Private.routes";
import Additems from "@/pages/AddItems/Additems";
import PostDetails from "@/pages/PostDetails/PostDetails";
import PostDetailsLoader from "@/components/loaders/PostDetailsLoader";
import AddItemLoader from "@/components/loaders/AddItemLoader";
import AllRecovered from "@/pages/AllRecovered/AllRecovered";
import AllRecoveredLoader from "@/components/loaders/AllRecoveredLoader";
import MyItems from "@/pages/MyItems/MyItems";
import Updateitem from "@/pages/Updateitem/Updateitem";
import AllItem from "@/pages/Allitems/AllItem";
import NotFound from "@/pages/NotFound/NotFound";

export const router = createBrowserRouter([
    // Main Layout
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/additems',
                element: (
                    <PrivateRoutes loader={<AddItemLoader />}>
                        <Additems />
                    </PrivateRoutes>
                )
            },
            {
                path: '/allrecovered',
                element: (
                    <PrivateRoutes loader={<AllRecoveredLoader />}>
                        <AllRecovered />
                    </PrivateRoutes>
                )
            }
            ,{
                path: '/post/:id',
                element: (
                    <PrivateRoutes loader={<PostDetailsLoader />}>
                        <PostDetails />
                    </PrivateRoutes>
                )
            },
            {
                path: '/myitems',
                element: (
                    <PrivateRoutes loader={<AllRecoveredLoader />}>
                        <MyItems />
                    </PrivateRoutes>
                )
            },
            {
                path: '/allItems',
                element: <AllItem />
            },
            {
                path: '/post/update/:id',
                element: (
                    <PrivateRoutes loader={<AddItemLoader />}>
                        <Updateitem />
                    </PrivateRoutes>
                )
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    // Auth Layout
    {
        path: '/auth',
        element: (
            <PublicRoutes>
                <AuthLayout />
            </PublicRoutes>
        ),
        children: [
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
        ]
    }
])