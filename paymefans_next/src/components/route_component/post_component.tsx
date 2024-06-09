"use client"
import { LucideEye, LucideHeart, LucideLock, LucideMessageSquare, LucidePlus, LucideRepeat2, LucideShare, LucideUsers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import usePostComponent from "@/contexts/post-component-preview";
import { HiPlay } from "react-icons/hi";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuthContext } from "@/lib/userUseContext";
import { checkUserIsSubscriber } from "@/utils/data/check-user-is-subscriber";
import { AuthUserProps } from "@/types/user";
import toast from "react-hot-toast";
import QuickPostActions from "../sub_componnets/quick_post_actions";

interface PostComponentProps {
    user: {
        id: number;
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
    const { user: authUser } = useUserAuthContext();
    const [playing, setPlaying] = useState<boolean>(false);
    const { fullScreenPreview } = usePostComponent();
    const [isSubscriber, setIsSubscriber] = useState<boolean>(false);
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);

    const setActiveImage = useCallback((url: string, type: string) => {
        fullScreenPreview({ url, type, open: true });
    }, [fullScreenPreview]);

    const formattedText = data.post.replace(/\r?\n/g, '<br/>');

    const clickImageEvent = useCallback((media: { url: string; type: string }) => {
        if (data.post_audience === "subscribers" && !isSubscriber) {
            toast.error("You need to be a subscriber to view this post");
            return;
        }
        setActiveImage(media.url, media.type);
    }, [isSubscriber, setActiveImage, data.post_audience]);

    const playMediaAndActivateControls = useCallback(() => {
        if (data.post_audience === "subscribers" && !isSubscriber) {
            toast.error("You need to be a subscriber to view this post");
            return;
        }
        videoRef.current?.play();
        videoRef.current?.setAttribute("controls", "controls");
        setPlaying(true);
    }, [isSubscriber, data.post_audience]);

    useEffect(() => {
        const checkSubscriberStatus = async () => {
            try {
                const res = await checkUserIsSubscriber(user, authUser as AuthUserProps);
                setIsSubscriber(res);
            } catch (error) {
                console.error("Error checking subscriber status:", error);
            }
        };

        if (data.post_audience === "public") setIsSubscriber(true);
        if (data.post_audience === "subscribers") checkSubscriberStatus();

        return () => {
            setIsSubscriber(false);
        }
    }, [user, authUser, data.post_audience]);

    useEffect(() => {
        const videoReff = videoRef.current;
        const handleVideoEnd = () => {
            videoReff?.removeAttribute("controls");
            setPlaying(false);
        };

        videoReff?.addEventListener("ended", handleVideoEnd);

        return () => {
            videoReff?.removeEventListener("ended", handleVideoEnd);
        };
    }, []);

    const redirecToPost = useCallback((e: MouseEvent) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) return;
        router.push(`/posts/${data.post_id}`);
    }, [router, data.post_id]);

    return (
        <>
            <div className="mb-10 cursor-pointer" onClick={redirecToPost}>
                <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                    <div className="flex items-center gap-1 md:gap-3">
                        <Image width={50} height={50} priority src={user?.image} alt="" className="w-8 md:w-10 rounded-full aspect-square object-cover" />
                        <Link href={user?.link} className="md:flex items-center gap-1">
                            <p className="text-black font-bold">{user.name}</p>{user.username}
                        </Link>
                        <small className="ml-auto">{data.time}</small>
                        <div className="text-black">
                            {data.post_audience === "public" ? <LucideEye size={15} /> : data.post_audience === "private" ? <LucideLock size={15} /> : <LucideUsers size={15} />}
                        </div>
                    </div>

                    <QuickPostActions options={{ post_id: data.post_id, username: user.username }} />
                </div>

                <div className="py-2 leading-loose text-gray-700" dangerouslySetInnerHTML={{ __html: formattedText }}></div>
                <div className={`grid gap-3 ${data.media.length === 2 ? "grid-cols-2" : data.media.length >= 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                    {data.media.slice(0, 3).map((media, index) => (
                        <div className="relative" key={index} onClick={e => e.stopPropagation()}>
                            {(!isSubscriber && data.post_audience === "subscribers") && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg overflow-hidden flex items-center justify-center z-10">
                                    <Image src={"/site/blur.jpg"} alt="" width={1} height={1} className="w-full h-full brightness-50 aspect-square object-cover absolute inset-0" />
                                    <Link href="/subscribe" className="text-white absolute text-lg font-bold">
                                        Subscribe to view
                                    </Link>
                                </div>
                            )}
                            {media.type === 'video' && (
                                <>
                                    <div className="relative">
                                        {(!isSubscriber && data.post_audience === "subscribers") ? (<>
                                            <Image src={"/site/blur.jpg"} alt={data.post} width={1} height={1} priority blurDataURL={"/site/blur.jpg"} className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer" />
                                        </>) : (
                                            <>
                                                <video ref={videoRef} controlsList="nodownload" width={200} height={200} className="w-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer">
                                                    <source src={media.url} type="video/mp4" />
                                                </video>
                                                {!playing && (
                                                    <div onClick={playMediaAndActivateControls} className="absolute inset-0 text-white bg-black bg-opacity-20 rounded-lg flex items-center justify-center cursor-pointer">
                                                        <button className="h-12 w-12 p-1 flex-shrink-0 rounded-full flex items-center justify-center bg-primary-dark-pink aspect-square">
                                                            <HiPlay className="text-white" size={50} />
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}

                            {media.type !== "video" && (
                                <>
                                    {(!isSubscriber && data.post_audience === "subscribers") ? (
                                        <Image src={"/site/blur.jpg"} alt={data.post} width={1} height={1} priority blurDataURL={"/site/blur.jpg"} className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer" />
                                    ) : (
                                        <Image src={media.url} alt={data.post} width={400} height={400} priority blurDataURL={media.poster ? media.poster : ""} onClick={() => clickImageEvent(media)} className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer" />
                                    )}
                                </>
                            )}
                            {index === 2 && data.media.length > 3 && (
                                <Link href={`/posts/${data.post_id}`} className="flex flex-col absolute inset-0 items-center justify-center bg-black rounded-lg aspect-[3/4] md:aspect-square bg-opacity-40 cursor-pointer select-none">
                                    <div><LucidePlus size={40} stroke="#fff" className="border-4 rounded-full" /></div>
                                    <p className="text-lg font-bold select-none text-white">{imageLength - 3} more</p>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex mt-6 justify-around text-sm w-full text-gray-600 py-1">
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                        <LucideHeart size={20} />{data.post_likes?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideMessageSquare size={20} />{data.post_comments?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideRepeat2 size={20} />{data.post_reposts?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideShare size={20} />
                    </span>
                </div>
            </div>
        </>
    );
}

export default PostComponent;
