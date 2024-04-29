"use client"
import {useSideBarContext} from "@/lib/pageContexts";
import {
    LucideSettings,
    LucideLogOut,
    LucideHelpCircle,
    LucideUser,
    LucideHeart,
    LucideAirplay,
    LucideStore,
    LucideMessageSquare,
    LucideUserPlus,
    Router,
} from "lucide-react";
import {useContext, useEffect} from "react";
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import swal from "sweetalert";
import { useUserAuthContext } from "@/lib/userUseContext";

const SideBar = () => {
    const router = useRouter()
    const {sideBarState, setSideBar} = useSideBarContext()
    const pathname = usePathname()
    // const {user} = useUserContext()
    const { user } = useUserAuthContext()

    useEffect(() => {
        const closeSideBar = () => {
            setSideBar(false)
        }
        closeSideBar()
    }, [pathname, setSideBar]);

    const LogOut = () => {
        // axiosInstance.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/logout`, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
        //     },
        // }).then(() => {
        // });
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login")
    };

    return (
        <>
            <div
                className={`lg:ml-auto bg-white h-screen lg:h-screen fixed lg:sticky top-0 overflow-auto smart-width p-4 z-50 shadow-xl lg:shadow-none lg:border-r duration-300 ease-in-out  ${sideBarState ? "left-0" : "-left-full"}`
                }>
                <div className="mt-8 mb-16 ">
                    <Image className="block w-auto h-8" quality={100} width={150} height={30} priority
                           src="/site/logo2.png" alt=""/>
                </div>
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            width={50}
                            height={50}
                            priority
                            src={user ? user.profile_image : "/site/banner.png"}
                            className="object-cover w-12 h-12 rounded-full"
                            alt=""
                        />
                        <div>
                            <h2 className="mb-0 text-sm font-bold leading-none">
                                {user?.name ? user.name : <p className='w-32 rounded-sm mb-1 h-5 bg-gray-300 animate-pulse'></p>}
                            </h2>
                            <span className="text-sm text-gray-600">{user ? user.username : <p className='w-32 rounded-sm h-3 bg-gray-300 animate-pulse'></p>}</span>
                        </div>
                    </div>
                    <div className="pt-5 mb-3">
                        {user ? (
                            <h2 className="flex items-center mb-1 text-xl font-bold leading-none">
                                {user.UserPoints.points?.toLocaleString("en-Us")}
                                <span className="ml-2">
                                    <Image width={20} height={20} src="/site/coin.svg"
                                           className="w-auto h-5 aspect-square" alt=""/>
                                </span>
                            </h2>) : (
                            <div className="w-1/2 p-2 py-3 animate-pulse bg-gray-300 rounded-md">
                            </div>
                        )}
                        <span className="text-sm font-medium text-gray-600">Your Balance</span>
                    </div>
                    <div className="flex gap-3 pt-4 mb-5 ">
                        <Link href="/mix/points" className="p-2 px-8 text-xs font-semibold text-white bg-black rounded">
                            Add Funds
                        </Link>
                        <Link href="/mix/wallet"
                              className="p-2 px-8 text-xs font-semibold text-black bg-white border border-gray-600 rounded">
                            Wallet
                        </Link>
                    </div>
                    <div className="pt-6">
                        <Link href="/mix/profile"
                              className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                            <LucideUser/>
                            <p>Profile</p>
                        </Link>
                        {user?.is_model && (
                            <Link href="/mix/live"
                                  className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                                <LucideAirplay/>
                                <p>Go Live</p>
                            </Link>
                        )}
                        <Link href="/hookup"
                              className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                            <LucideHeart/>
                            <p>Hook Up</p>
                        </Link>
                        <Link href="/mix/"
                              className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                            <LucideStore/>
                            <p>Store</p>
                        </Link>
                        <Link href="/mix/messages"
                              className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                            <LucideMessageSquare/>
                            <p>Messages</p>
                        </Link>
                        {!user?.is_model && (
                            <Link href="/mix/models/benefits"
                                  className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                                <LucideUserPlus/>
                                <p>Become A Model</p>
                            </Link>
                        )}
                        <hr className="mt-8 mb-8"/>
                        <Link href="/mix/"
                              className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                            <LucideHelpCircle/>
                            <p>Help</p>
                        </Link>
                        <Link href="/mix/settings"
                              className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
                            <LucideSettings/>
                            <p>Settings & Privacy</p>
                        </Link>
                        <span
                            className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl cursor-pointer select-none"
                            onClick={() => {
                                swal({
                                    title: "Are you sure?",
                                    text: "You are about to logout",
                                    icon: "warning",
                                    buttons: ["Cancel", "Logout"],
                                    dangerMode: true,
                                }).then((willLogout) => {
                                    if (willLogout) {
                                        LogOut();
                                    }
                                });
                            }}
                        >
                            <LucideLogOut/>
                            <p>Logout</p>
                        </span>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setSideBar(false)}
                className={`lg:hidden block fixed inset-0 z-40 w-full bg-opacity-50 duration-300 ease-in-out bg-black ${sideBarState ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            </div>

        </>
    );
};

export default SideBar;
