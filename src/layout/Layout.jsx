import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <Header />  {/* Header */}
            <Outlet /> 
            <Footer />
            <ScrollRestoration />
        </>
    );
}

export default Layout