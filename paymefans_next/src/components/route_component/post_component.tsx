"use client"
import { LucideHeart, LucideMessageSquare, LucidePlay, LucideRepeat2, LucideShare } from "lucide-react";
import Link from "next/link";
import QuickPostActions from "../sub_componnets/quick_post_actions";
import Image from "next/image";
import usePostComponent from "@/contexts/post-component-preview";

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
                    </div>

                    <QuickPostActions />
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
                                        onClick={() => {
                                            setActiveImage(media.url, media.type)
                                        }}
                                        className="w-full rounded-lg mt-3 aspect-square object-cover cursor-pointer"
                                    ></video>
                                    <div
                                        onClick={() => {
                                            setActiveImage(media.url, media.type)
                                        }}
                                        className="absolute inset-0 m-auto text-white bg-black bg-opacity-20 rounded-lg flex items-center justify-center cursor-pointer">
                                        <LucidePlay size={50} stroke="#fff" />
                                    </div>
                                </div>
                            ) : (
                                <Image
                                    src={media.url}
                                    alt=""
                                    width={400}
                                    height={400}
                                    priority
                                    onClick={() => {
                                        setActiveImage(media.url, media.type)
                                    }}
                                    className="w-full rounded-lg mt-3 aspect-square object-cover cursor-pointer"
                                />
                            )}
                            {index === 2 && data.media.length > 3 ? (
                                <Link href={`/mix/posts/${data.post_id}`}
                                    className="flex absolute inset-0 items-center justify-center bg-black rounded-lg mt-3 aspect-square bg-opacity-40 cursor-pointer select-none">
                                    <p className="text-xl font-bold select-none text-white">+{imageLength - 3}</p>
                                </Link>
                            ) : null}
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


