"use client"

// import '@vidstack/react/player/styles/base.css';
import { MediaPlayer, MediaPlayerInstance, MediaProvider } from '@vidstack/react';
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
import { Stream } from "@cloudflare/stream-react";
import swal from 'sweetalert';

export interface UserMediaProps {
    id: number;
    media_id: string;
    post_id: number;
    media_type: string;
    url: string;
    blur: string;
    poster: string;
    locked: boolean;
    accessible_to: string;
    created_at: string;
    updated_at: string;
    userId?: number;
}

interface PostData {
    post: string;
    post_id: string;
    post_audience: string;
    post_likes?: number;
    post_comments?: number;
    post_shares?: number;
    post_reposts?: number;
    time: string;
    media: UserMediaProps[];
}

interface PostComponentProps {
    user: {
        id: number;
        user_id: string;
        name: string;
        link: string;
        username: string;
        image: string;
    };
    data: PostData;
}

const PostComponent: React.FC<PostComponentProps> = ({ user, data }) => {
    const imageLength = data.media.length;
    const { user: authUser } = useUserAuthContext();
    const { fullScreenPreview } = usePostComponent();
    const [isSubscriber, setIsSubscriber] = useState<boolean>(false);
    const router = useRouter();
    const videoRef = useRef<MediaPlayerInstance>(null);

    const setActiveImage = useCallback((url: string, type: string) => {
        fullScreenPreview({ url, type, open: true });
    }, [fullScreenPreview]);

    const formattedText = () => {
        const text = data.post.replace(/\r?\n/g, '<br/>');

        if (data.post_audience === "subscribers" && !isSubscriber) {
            return "<p class='text-sm text-red-500'>This post is only available to subscribers</p>";
        }

        if (data.post.length > 200) {
            return text.slice(0, 200) + "...";
        }
    }

    const clickImageEvent = useCallback((media: { url: string; media_type: string }) => {
        if (data.post_audience === "subscribers" && !isSubscriber) {
            toast.error("You need to be a subscriber to view this post");
            return;
        }
        setActiveImage(media.url, media.media_type);
    }, [isSubscriber, setActiveImage, data.post_audience]);

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

    const redirectToPost = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!(target instanceof HTMLAnchorElement) && !(target instanceof HTMLButtonElement)) {
            e.preventDefault();
            if (data.post_audience === "subscribers" && !isSubscriber) {
                return;
            } else {
                router.push(`/posts/${data.post_id}`);
            }
        }
    }, [router, data.post_id, data.post_audience, isSubscriber]);

    const handleNonSubscriberClick = (e: MouseEvent) => {
        e.stopPropagation()
        if (data.post_audience === "subscribers" && !isSubscriber) {
            e.preventDefault();
            swal({
                title: "You need to be a subscriber to view this post",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: {
                        text: "Subscribe",
                        className: "bg-primary-dark-pink text-white",
                    }
                },
            }).then((willSubscribe) => {
                if (willSubscribe) {
                    router.push(`/subscribe/${user.user_id}`);
                }
            });
        }
    }

    return (
        <div className="mb-10 cursor-pointer" onClick={redirectToPost}>
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

            <div className="py-2 leading-loose text-gray-700" dangerouslySetInnerHTML={{ __html: formattedText() as TrustedHTML }}></div>
            <div className={`grid gap-3 ${data.media.length === 2 ? "grid-cols-2" : data.media.length >= 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                {data.media.slice(0, 3).map((media, index) => (
                    <div className="relative" key={index} onClick={handleNonSubscriberClick}>
                        {(!isSubscriber && data.post_audience === "subscribers") && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg overflow-hidden flex items-center justify-center z-10">
                                <Image src={media.blur ? media.blur : "/site/blur.jpg"} alt="" width={30} height={30} className="w-full h-full brightness-50 aspect-square object-cover absolute inset-0" />
                                <Link href="/subscribe" className="text-white absolute text-lg font-bold">
                                    <LucideLock />
                                </Link>
                            </div>
                        )}
                        {media.media_type === 'video' && (
                            <>
                                {(!isSubscriber && data.post_audience === "subscribers") ? (
                                    <Image src={"/site/blur.jpg"} alt={data.post} width={30} height={30} priority blurDataURL={media.blur} className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer" />
                                ) : (
                                    <div className="relative">
                                        <VideoComponent media={media} data={data} clickImageEvent={clickImageEvent} isSubscriber={isSubscriber} />
                                    </div>
                                )}
                            </>
                        )}
                        {media.media_type !== "video" && (
                            <>
                                {(!isSubscriber && data.post_audience === "subscribers") ? (
                                    <Image src={media.blur} alt={data.post} width={30} height={30} priority blurDataURL={media.blur} className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer" />
                                ) : (
                                    <ImageComponent media={media} data={data} clickImageEvent={clickImageEvent} />
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
    );
}


const ImageComponent: React.FC<{ media: UserMediaProps, data: PostData, clickImageEvent: (media: UserMediaProps) => void }> = ({ media, data, clickImageEvent }) => {
    return (
        <>
            <Image src={media.url} alt={data.post} width={500} height={500} unoptimized unselectable="on" blurDataURL={media.poster ? media.poster : ""} onClick={() => clickImageEvent(media)} className="w-full h-full rounded-lg aspect-[3/4] md:aspect-square object-cover cursor-pointer" />
        </>
    )
}

interface VideoComponentProps {
    media: UserMediaProps;
    data: PostData;
    clickImageEvent: (media: UserMediaProps) => void;
    isSubscriber: boolean;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ media, data, clickImageEvent, isSubscriber }) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const videoRef = useRef<MediaPlayerInstance | null>(null);

    const playPauseVideo = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (data.post_audience === "subscribers" && !isSubscriber) {
            toast.error("You need to be a subscriber to view this post");
            return;
        }
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    }, [isSubscriber, data.post_audience, playing]);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        const handleVideoEnd = () => {
            if (videoElement) {
                videoElement.controls = false;
                setPlaying(false);
            }
        };

        videoElement.addEventListener("ended", handleVideoEnd);
        videoElement.addEventListener("play", () => setPlaying(true));

        return () => {
            videoElement.removeEventListener("ended", handleVideoEnd);
        };
    }, []);

    return (
        <>

            <div style={{ position: "relative", paddingTop: "56.25%", background: "black" }}>
                <iframe
                    src={`${media.url.replace("manifest/video.m3u8", "")}iframe?muted=true&poster=${encodeURIComponent(media.poster)}`}
                    loading="lazy"
                    style={{ border: "none", position: "absolute", top: 0, left: 0, height: " 100%", width: " 100%", aspectRatio: "1/1" }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen={true}
                ></iframe>
            </div >
            {/* <MediaPlayer
                ref={videoRef}
                playsInline
                className="h-full"
                onClick={(e: MouseEvent<HTMLVideoElement>) => {
                    clickImageEvent(media);
                }}
                onEnded={() => setPlaying(false)}
                poster={media.poster ? media.poster : ""}
                title={data.post}
                src={media.url}
                muted
                controls={playing}
            >
                <MediaProvider className='video-stream-player' />
            </MediaPlayer> */}
            {/* {!playing && (
                <div onClick={playPauseVideo} className="absolute inset-0 text-white bg-black bg-opacity-20 rounded-lg flex items-center justify-center cursor-pointer">
                    <button className="h-12 w-12 p-1 flex-shrink-0 rounded-full flex items-center justify-center bg-primary-dark-pink bg-opacity-30 aspect-square">
                        <HiPlay className="text-white" size={50} />
                    </button>
                </div>
            )} */}
        </>
    );
}


export default PostComponent;
