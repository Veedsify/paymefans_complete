"use client"
import { LucideLock, LucidePlay } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import usePostComponent from "@/contexts/post-component-preview";

type MediaType = { media: string; type: string } | null;
type MediaDataType = { url: string; locked: boolean; type: string, poster?: string };

const images = [
    {
        url:
            "https://images.pexels.com/photos/7206287/pexels-photo-7206287.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        locked: false,
        type: "image",
    },
    {
        url:
            "https://images.pexels.com/photos/14740203/pexels-photo-14740203.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        locked: false,
        type: "image",
    },
    {
        url:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
        locked: true,
        type: "image",
    },
    {
        url:
            "https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg?auto=compress&cs=tinysrgb&w=600",
        locked: false,
        type: "image",
    },
    {
        url:
            "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?auto=compress&cs=tinysrgb&w=600",
        locked: true,
        type: "image",
    },
    {
        url:
            "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&w=600",
        locked: false,
        type: "image",
    },
    {
        url:
            "https://images.pexels.com/photos/3657429/pexels-photo-3657429.jpeg?auto=compress&cs=tinysrgb&w=600",
        locked: true,
        type: "image",
    },
    { url: "/videos/video.mp4", locked: false, type: "video", poster: "https://images.pexels.com/photos/19674422/pexels-photo-19674422/free-photo-of-woman-in-a-red-sequin-dress-posing.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
];
const MediaPanelImageCard = ({ sort }: { sort: string }) => {
    const [data, setData] = useState<MediaDataType[]>(images);
    const { fullScreenPreview } = usePostComponent()

    useEffect(() => {
        const mediasort =
            sort === "all" ? images : images.filter((media) => media.type === sort);
        setData(mediasort);
    }, [setData, sort]);

    const [preview, setPreview] = useState<MediaType | null>({
        media: "",
        type: "",
    });

    const PreviewImageHandler = (
        media: string,
        locked: boolean,
        type: string
    ) => {
        if (locked) return;
        fullScreenPreview({ url: media, type, open: true });
    };

    return (
        <>
            {data.map((media, index) => (
                <div key={index} className="aspect-square overflow-hidden relative ">
                    {media.type === "video" ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={media?.poster || ""}
                                alt="video poster"
                                priority
                                className=" w-[400px] h-[400px] cursor-pointer object-cover transition-all duration-300 ease-in-out" width={400}
                                height={400}
                                onClick={() => PreviewImageHandler(media.url, media.locked, media.type)}
                            />
                            <div
                                onClick={() => PreviewImageHandler(media.url, media.locked, media.type)}
                                className="absolute bg-black w-full h-full inset-0 bg-opacity-20 cursor-pointer flex items-center justify-center">
                                <LucidePlay stroke="white" size={30} strokeWidth={2} />
                            </div>
                        </div>
                    ) : (
                        <Image
                            width={400}
                            height={400}
                            priority
                            onClick={() =>
                                PreviewImageHandler(media.url, media.locked, media.type)
                            }
                            src={media.url}
                            alt=""
                            className=" w-full h-full cursor-pointer object-cover transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    )}
                    {media.locked && <LockedMediaOverlay />}
                </div>
            ))}
        </>
    );
};
const LockedMediaOverlay = () => {
    return (
        <div
            className="lock-icon absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 backdrop-blur-md md:backdrop-blur-lg bg-opacity-40 cursor-not-allowed">
            <LucideLock stroke="white" size={30} strokeWidth={2} />
        </div>
    );
};


export default MediaPanelImageCard;

