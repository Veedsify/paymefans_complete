"use client"
import { LucideEye, LucideHeart, LucideLock, LucideMessageSquare, LucidePlus, LucideRepeat2, LucideShare, LucideUsers } from "lucide-react";
import Link from "next/link";
import QuickPostActions from "../sub_componnets/quick_post_actions";
import Image from "next/image";
import usePostComponent from "@/contexts/post-component-preview";
import { HiPlay } from "react-icons/hi";
import { useCallback } from "react";

interface PostComponentProps {
    user: {
        name: string;
        link: string;
        username: string;
        image: string;
    };
    data: {
        post: string;
        post_id: string;
        post_audience: string;
        post_likes?: number;
        post_comments?: number;
        post_shares?: number;
        post_reposts?: number;
        media: {
            type: string;
            poster?: string | null
            url: string;
        }[];
        time: string;
    };
}

const PostComponent: React.FC<PostComponentProps> = ({ user, data }) => {
    const imageLength = data.media.length;
    const { fullScreenPreview } = usePostComponent();
    const setActiveImage = (url: string, type: string) => {
        fullScreenPreview({ url: url, type: type, open: true })
    }
    const formattedText = data.post.replace(/\r?\n/g, '<br/>');


    const clickImageEvent = useCallback((media: { url: string; type: string }) => {
        setActiveImage(media.url, media.type)
    }, [fullScreenPreview, setActiveImage])

    return (
        <>
            <div className="mb-10">
                <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                    <div className="flex items-center gap-3">
                        <Image width={50} height={50} priority src={user?.image} alt=""
                            className="w-8 md:w-10 rounded-full aspect-square object-cover" />
                        <Link href={user?.link} className="flex items-center gap-1">
                            <p className="text-black font-bold">{user.name}</p>{user.username}
                        </Link>
                        <small className="ml-auto">
                            {data.time}
                        </small>
                        <div className="text-black">
                            {data.post_audience === "public" ? (<LucideEye size={15} />) : data.post_audience === "private" ? (<LucideLock size={15} />) : (<LucideUsers size={15} />
                            )}
                        </div>
                    </div>

                    <QuickPostActions
                        options={{
                            post_id: data.post_id,
                            username: user.username,
                        }}
                    />
                </div>

                <div className="py-2 leading-loose text-gray-700"
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                >
                </div>
                <div
                    className={`grid gap-3 ${data.media.length === 2 ? "grid-cols-2" : data.media.length >= 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                    {data.media.slice(0, 3).map((media, index) => (
                        <div className="relative" key={index}>
                            {media.type === 'video' ? (
                                <div className="relative">
                                    <video
                                        src={`${media.poster ? media.poster : ""}`}
                                        width={200}
                                        height={200}
                                        onClick={() => clickImageEvent(media)}
                                        className="w-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer"
                                    ></video>
                                    <div
                                        onClick={() => clickImageEvent(media)}
                                        className="absolute inset-0 text-white bg-black bg-opacity-20 rounded-lg flex items-center justify-center cursor-pointer">
                                        <button className="h-12 w-12 p-1 inline-block flex-shrink-0 rounded-full flex items-center justify-center bg-primary-dark-pink aspect-square">
                                            <HiPlay className="text-white" size={50} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Image
                                    src={media.url}
                                    alt=""
                                    width={400}
                                    height={400}
                                    priority
                                    onClick={() => clickImageEvent(media)}
                                    className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer"
                                />
                            )}
                            {index === 2 && data.media.length > 3 ? (
                                <Link href={`/mix/posts/${data.post_id}`}
                                    className="flex flex-col absolute inset-0 items-center justify-center bg-black rounded-lg aspect-[3/4] md:aspect-square bg-opacity-40 cursor-pointer select-none">
                                    <div>
                                        <LucidePlus size={40} stroke="#fff" className="border-4 rounded-full" />
                                    </div>
                                    <p className="text-lg font-bold select-none text-white">{imageLength - 3} more</p>
                                </Link>
                            ) : null}
                            {/* <div className="absolute bg-black rounded-lg bg-opacity-70 inset-0 backdrop-blur w-full h-full z-50">

                            </div> */}
                        </div>
                    ))}
                </div>
                <div className="flex mt-6 justify-around text-sm w-full text-gray-600 py-1">
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                        <LucideHeart size={20} />
                        {data.post_likes?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideMessageSquare size={20} />
                        {data.post_comments?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideRepeat2 size={20} />
                        {data.post_reposts?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideShare size={20} />
                    </span>
                </div>
            </div >
        </>
    );
}

export default PostComponent;


