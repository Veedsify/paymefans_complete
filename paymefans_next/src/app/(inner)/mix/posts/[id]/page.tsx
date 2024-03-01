"use client"
import QuickPostActions from "@/app/components/sub_componnets/quick_post_actions";
import { LucideHeart, LucideMessageSquare, LucideRepeat2, LucideShare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useState } from "react";


const Post = () => {
    const [activeImage, setActiveImage] = useState<string | null>(null)

    return (
        <div className="p-4">
            <div className="mb-10">
                <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                    <div className="flex items-center gap-3">
                        <Image width={40} height={40} src="/images/login_image.png" alt=""
                            loading="lazy" className="w-8 md:w-10 rounded-full aspect-square object-cover" />
                        <Link href="/" className="flex items-center gap-1">
                            <p className="text-black font-bold">Jenna</p>@jenna
                        </Link>
                        <small className="ml-auto">3h</small>
                    </div>

                    <QuickPostActions />
                </div>

                <p className="text-sm font-medium py-2 leading-loose text-gray-700">
                    Months on ye at by esteem desire warmth former. Sure that that way gave any fond now. His boy middleton sir nor engrossed affection excellent. Dissimilar compliment cultivated preference eat sufficient may. Well next door soon we mr he four. Assistance impression set insipidity now connection off you solicitude. Under as seems we me stuff those style at. Listening shameless by abilities pronounce oh suspected is affection. Next it draw in draw much bred.
                </p>

                <PostComponentPreview image={activeImage} close={setActiveImage} />
                <div className="flex mt-6 justify-around text-sm w-full text-gray-600 py-1 mb-5">
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                        <LucideHeart size={14} />
                        23
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideMessageSquare size={14} />
                        16
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideRepeat2 size={14} />
                        2
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideShare size={14} />
                    </span>
                </div>
                <div className={`grid gap-3 grid-cols-1`}>
                    <div className="relative">
                        <Image
                            height={200}
                            width={200}
                            priority
                            src="/images/login_image.png"
                            alt=""
                            onClick={() => setActiveImage("/images/login_image.png")}
                            loading="lazy"
                            className="w-full rounded-lg mt-3 aspect-square object-cover cursor-pointer"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            height={200}
                            width={200}
                            priority
                            src="/images/login_image.png"
                            alt=""
                            onClick={() => setActiveImage("/images/login_image.png")}
                            loading="lazy"
                            className="w-full rounded-lg mt-3 aspect-square object-cover cursor-pointer"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            height={200}
                            width={200}
                            priority
                            src="/images/login_image.png"
                            alt=""
                            onClick={() => setActiveImage("/images/login_image.png")}
                            loading="lazy"
                            className="w-full rounded-lg mt-3 aspect-square object-cover cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;

const PostComponentPreview = ({ image, close }: { image: string | null, close: React.Dispatch<SetStateAction<string | null>> }) => {

    return (
        <div
            onClick={() => {
                close(null)
            }}
            className={`fixed transition-all ease-in-out duration-300 inset-0 w-full flex items-center justify-center bg-black z-50 bg-opacity-90
            ${image ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}>
            <div className="p-4">
                {image && (
                    <Image width={1200} height={1200} priority src={image} className={`w-screen xl:w-[550px] block object-cover transition-all duration-300 ${image ? "translate-y-0" : "translate-y-3"}`} alt="" />
                )}
            </div>
        </div>
    )
}