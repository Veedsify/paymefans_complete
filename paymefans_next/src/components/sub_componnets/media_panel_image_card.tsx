"use client"
import { LucideLock } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import VideoPlayer from "./videoplayer";
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
        locked: false,
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
        locked: false,
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
        locked: false,
        type: "image",
    },
    { url: "/videos/video.mp4", locked: false, type: "video", poster: "https://images.pexels.com/photos/3657429/pexels-photo-3657429.jpeg?auto=compress&cs=tinysrgb&w=600" },
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
                        <video autoPlay={false} loop={true} poster={media.poster} className=" w-full h-full cursor-pointer object-cover transition-all duration-300 ease-in-out hover:scale-105" onClick={()=>{
                            PreviewImageHandler(media.url, media.locked, media.type)
                        }}>
                            <source src={media.url} type="video/mp4" />
                        </video>
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

