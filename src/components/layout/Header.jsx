import { Link, NavLink } from "react-router-dom"
import Logo from "../ui/logo"
import Button from "../ui/Button"
import { SlHome } from "react-icons/sl"
import { BsGrid } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"
import { CiUser } from "react-icons/ci"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useContext } from "react"
import { AuthConext } from "@/context/AuthContext"
import { Skeleton } from "../ui/skeleton"
import Avatar from "../ui/Avatar"
import Logout from "@/hooks/Logout"
import { PiPlus } from "react-icons/pi"
import { LuRefreshCw } from "react-icons/lu"
import { BsUiChecksGrid } from "react-icons/bs"

const Header = () => {

    const { authInfo, isLoading } = useContext(AuthConext)

    return (
        <>
            <header className="flex justify-center border-b z-[9999999] bg-white">
                <div className="w-primary inline-flex px-5 py-3 justify-between items-center gap-5">
                    {/* Logo */}
                    <Link to={'/'}> 
                        <Logo className={`lg:w-[140px] w-[100px]`}/>
                    </Link>
                    {/* Navs */}
                    <nav className="hidden lg:block">
                        <div className="flex gap-8">
                            {NavData && NavData.map((nav, index) => (
                                <Link
                                    key={index}
                                    to={nav.path}
                                    style={{
                                        '--hover-color': generateRandomColor(),
                                    }}
                                    className="text-sm lg:text-base transition-colors duration-300 hover:text-[var(--hover-color)]"
                                >
                                    {nav.pathName}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    {/* Buttons */}
                    <div className="flex gap-5 items-center w-[155px] justify-end">
                        {
                            isLoading ? (
                                <Skeleton className={`w-[155px]  h-[38px]`} />
                            )
                            : !authInfo ? (
                                <>
                                    <Link 
                                        to={'/auth/login'} 
                                        className="text-sm lg:text-base transition-colors duration-300 hover:text-[var(--hover-color)]"
                                        style={{
                                            '--hover-color': generateRandomColor(),
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link to={'/auth/register'}>
                                        <Button>
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )
                            : (
                            <>
                                <div onClick={() => Logout('Logut Succesfull')}>
                                    <Button>
                                        Logout
                                    </Button>
                                </div>
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar className={`scale-90`}  name={authInfo?.displayName} avatar={authInfo?.photoURL}/>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[220px] mt-1 mr-5">
                                        <div className="flex flex-col">
                                            {DropDownData && DropDownData.map((data, index) => (
                                                <Link
                                                    key={index}
                                                    className="hover:bg-neutral-100 p-1 text-sm px-3 rounded-md flex items-center gap-2"
                                                    to={data.path}
                                                    >{data.icon} {data.pathName}</Link>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                            )
                        }
                    </div>
                </div>
                {/* Bottom Header For Mobile */}
                <div className="fixed bottom-0 w-full lg:hidden py-3 border-t z-[9999] px-5 flex justify-around bg-white">
                    <NavIcons to={'/allitems'} pathName={'Lost & Found'}>
                        <BsGrid/>
                    </NavIcons>
                    <NavIcons to={'/'} pathName={'Home'}>
                        <SlHome />
                    </NavIcons>
                    <Popover>
                        <PopoverTrigger>
                            <div className="flex flex-col gap-1 items-center text-neutral-700">
                                <div
                                    className="flex w-fit border  p-3 rounded-lg cursor-pointer hover:rounded-[50px] transition-all" 
                                >
                                    <FiPlus />
                                </div>
                                <span className="hidden min-[380px]:block text-sm">Options</span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="mb-5 shadow-none flex flex-col w-[220px]">
                            {DropDownData && DropDownData.map((data, index) => (
                                <Link
                                    key={index}
                                    className="hover:bg-neutral-100 p-1 text-sm px-3 rounded-md flex items-center gap-2"
                                    to={data.path}
                                    >{data.icon} {data.pathName}</Link>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>
            </header>
        </>
    )
}

export default Header

const NavData = [
    {pathName: 'Home', path: '/'},
    {pathName: 'Lost & Found Items', path: '/allItems'}
]

const DropDownData = [
    {pathName: 'Add Lost & Found', path: '/addItems', icon: <PiPlus />},
    {pathName: 'All Recovered Items', path: '/allRecovered', icon: <LuRefreshCw />},
    {pathName: 'Manage My Items', path: '/myitems', icon: <BsUiChecksGrid />}
]

export function generateRandomColor() {
    const randomNum = Math.floor(Math.random() * 16777216)
    const hexColor = `#${randomNum.toString(16).padStart(6, "0")}`
    return hexColor
}
  

const NavIcons = ({pathName, to , children}) => (
    <div className="flex flex-col gap-1 items-center text-neutral-700">
        <NavLink
            to={to}
            className={({isActive}) => `${isActive && `bg-sky-600 text-white rounded-[50px] hover:rounded-xl`} flex w-fit border  p-3 rounded-lg hover:rounded-[50px] transition-all`}
        >
            {children}
        </NavLink>
        <span className="hidden min-[380px]:block text-sm">{pathName}</span>
    </div>
)