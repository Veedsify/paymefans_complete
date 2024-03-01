import { LucideSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Messages = async () => {
    return (
        <div className="py-3 px-3">
            <div className="flex items-center mb-7">
                <span className="font-bold text-xl flex-shrink-0">Messages</span>
                <div className="flex items-center justify-center w-8 h-8 aspect-square flex-shrink-0 ml-auto text-white md:py-3 md:px-3 py-1 px-1  bg-primary-text-dark-pink rounded-full font-bold">2</div>
            </div>
            <div className="flex align-baseline justify-between border border-gray-400 rounded-md p-4 mb-7 w-full">
                <input type="text" placeholder="Search Messages" className=" text-sm outline-none border-none" />
                <LucideSearch className="block text-center" />
            </div>
            <div>
                <div className="block bg-messages-unread mb-3 rounded cursor-pointer" data-link="/mix/chats/1" >
                    <div className="flex items-center gap-2 md:gap-5 p-3">
                        <Link href="/mix/profile">
                            <Image width={65} height={65} src="/images/user.png" alt="user messages" className="object-cover rounded-full w-12  md:w-16 aspect-square" />
                        </Link>
                        <div className="flex-1">
                            <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                                <Link href="/"><h1 className="font-bold">Kesha Adams</h1></Link>
                                <Link href="/">
                                    <p className="hidden md:block">@keshaadams</p>
                                </Link>
                                <div className="flex items-center gap-2 ml-auto">
                                    <p className="hidden md:block">Jan 22</p>
                                    <span className="text-white w-2 h-2 bg-primary-dark-pink rounded-full block"></span>
                                </div>
                            </div>
                            <div className="text-sm">
                                <Link href="/mix/chats/1">
                                    <p className="text-xs md:text-sm">Hey, I need to talk to you about something.....</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="block mb-3 rounded cursor-pointer" data-link="/mix/chats/1" >
                        <div className="flex items-center gap-2 md:gap-5 p-3">
                            <Link href="/mix/profile">
                                <Image src="/images/user.png" alt="" width={65} height={65} priority className="object-cover rounded-full w-12  md:w-16 aspect-square" />
                            </Link>
                            <div className="flex-1">
                                <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                                    <Link href="/"> <h1 className="font-bold">Kesha Adams</h1></Link>
                                    <Link href="/">
                                        <p className="hidden md:block">@keshaadams</p>
                                    </Link>
                                    <div className="ml-auto">
                                        <p className="hidden md:block">Jan 22</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <Link href="/mix/chats/1">
                                        <p className="text-xs md:text-sm">Hey, I need to talk to you about something.....</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;