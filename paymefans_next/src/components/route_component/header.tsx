"use client"
import { LucideBellRing, LucideMessageCircle, LucideUserPlus } from "lucide-react";
import HeaderTitle from "../sub_componnets/header_title";
import Image from "next/image";
import HeaderImgClick from "../sub_componnets/headerImgClick";
import getUserData from "@/utils/data/user-data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
    const [notification, setNotification] = useState(false)
    const ref = useRef<HTMLUListElement>(null)

    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setNotification(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [])

    return (
        <header className="px-4 lg:px-8 py-3  bg-primary-dark-pink lg:bg-white dark:bg-black dark:text-white border-b dark:border-slate-800">
            <div className="flex items-center">
                <HeaderTitle />
                <Image width={200} height={40} src="/site/logo3.png" alt="" className="block lg:hidden h-auto" />
                <ul className="flex items-center gap-6 ml-auto lg:hidden">
                    <li className="relative">
                        <span className="cursor-pointer"
                            onClick={() => setNotification(!notification)}
                        >
                            <LucideBellRing stroke="#fff" />
                        </span>
                        <ul
                            ref={ref}
                            className={`${notification ? "block" : "hidden"} absolute z-10 w-72 top-10 right-0 bg-white rounded-lg max-h-[250px] overflow-y-auto shadow-2xl border`}>
                            <h1 className="text-black font-bold mb-3 p-4 pb-2">Notifications</h1>
                            <li>
                                <Link href="/messages" className="flex items-center gap-4 border-b p-4 hover:bg-messages-unread">
                                    <div className="p-2 flex-shrink-0 h-12 w-12 rounded-full bg-primary-dark-pink flex items-center justify-center">
                                        <LucideMessageCircle stroke="#fff" strokeWidth="3" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <h1 className="text-black font-bold text-sm">New message</h1>
                                            <span className="text-gray-500 text-xs">
                                                1m ago
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm">You have a new message </p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/messages" className="flex items-center gap-4 border-b p-4 hover:bg-messages-unread">
                                    <div className="p-2 flex-shrink-0 h-12 w-12 rounded-full bg-primary-dark-pink flex items-center justify-center">
                                        <LucideMessageCircle stroke="#fff" strokeWidth="3" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <h1 className="text-black font-bold text-sm">New message</h1>
                                            <span className="text-gray-500 text-xs">
                                                1m ago
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm">You have a new message </p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/messages" className="flex items-center gap-4 border-b p-4 hover:bg-messages-unread">
                                    <div className="p-2 flex-shrink-0 h-12 w-12 rounded-full bg-primary-dark-pink flex items-center justify-center">
                                        <LucideMessageCircle stroke="#fff" strokeWidth="3" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <h1 className="text-black font-bold text-sm">New message</h1>
                                            <span className="text-gray-500 text-xs">
                                                1m ago
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm">You have a new message </p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/messages" className="flex items-center gap-4 p-4 hover:bg-messages-unread">
                                    <div className="p-2 flex-shrink-0 h-12 w-12 rounded-full bg-primary-dark-pink flex items-center justify-center">
                                        <LucideUserPlus stroke="#fff" strokeWidth="3" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <h1 className="text-black font-bold text-sm">New Follower</h1>
                                            <span className="text-gray-500 text-xs">
                                                1m ago
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm">@myaby12 followed you</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>

                    </li>
                    <HeaderImgClick />
                </ul>
            </div>
        </header>
    );
}

export default Header;