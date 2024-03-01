"use client"
import VideoStreamer from "@/app/components/route_component/video_streamer";
import { LucideCoins, LucideHeart, LucideSend, LucideShapes, LucideShare, LucideShare2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Stream = () => {

    return (
        <div className="relative min-h-screen-custom border-none outline-none pointer-events-all">
            <VideoStreamer className="absolute inset-0 w-full h-full object-cover " />
            {/* <div className="absolute inset-0 bg-video-stream-gradient ">
            </div> */}
            <div className="absolute bottom-0 left-0 w-full bg-video-stream-gradient">
                <div className="p-5 flex items-end gap-8">
                    <div className="overflow-hidden flex-1">
                        <div className="flex items-center gap-3">
                            <Image src="/images/user.png" alt="coin" width={60} height={60} className="h-[60px] w-[60px] rounded-full object-cover border-primary-dark-pink border-2" />
                            <div>
                                <span className="text-sm font-bold block mb-2 text-white">
                                    <Link href="/user/username">
                                        @jenna
                                    </Link>
                                </span>
                                <span className="text-sm font-medium text-white">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo ab iure necessitatibus magni natus voluptatibus totam repudiandae vitae temporibus minus!</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex text-center justify-center flex-col gap-8 ml-auto">
                            <button className="flex items-center justify-center flex-col gap-2">
                                <LucideHeart fill="transparent" size={35} strokeWidth={1} />
                                {/* <LucideHeart fill="#f20" size={35} strokeWidth={0} /> */}
                                <span className="text-white text-xs font-medium">1.2k</span>
                            </button>
                            <button className="flex items-center justify-center flex-col gap-2">
                                <Image src="/site/coin.svg" alt="coin" width={25} height={25} className="h-[25px] w-[25px]" />
                                <span className="text-white text-xs font-medium">Point me</span>
                            </button>
                            <button className="flex items-center justify-center flex-col gap-2">
                                <LucideShare2 />
                                {/* <LucideHeart fill="#f20" size={35} strokeWidth={0} /> */}
                                <span className="text-white text-xs font-medium">share</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4 pb-10">
                    <form action="" className="flex items-center gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input type="text" className="p-3 border border-white w-full rounded-md font-medium flex-1 bg-transparent text-white outline-none" />
                        <button type="submit" className="p-3 bg-primary-dark-pink rounded-md">
                            <LucideSend stroke="#fff" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Stream;