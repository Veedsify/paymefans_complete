"use client"
import { LucideLock } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import VideoPlayer from "./videoplayer";
import Image from "next/image";

type MediaType = { media: string; type: string } | null;
type MediaDataType = { url: string; locked: boolean; type: string }[];

const images: MediaDataType = [
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
    { url: "/videos/video.mp4", locked: false, type: "video" },
];
const MediaPanelImageCard = ({ sort }: { sort: string }) => {
    const [data, setData] = useState<MediaDataType>(images);
    const [imageOpen, setImageOpen] = useState(false);
    
    
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
        setPreview({ media, type });
        if (type === "image") {
            setImageOpen(true)
        }
    };

    return (
        <>
            {data.map((media, index) => (
                <div key={index} className="aspect-square overflow-hidden relative ">
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

                    <PreviewMediaOverlayVideo
                        media={preview?.type === "video" ? preview : null}
                        close={setPreview}
                    />
                    <PreviewMediaOverlayImage
                        setImageOpen={setImageOpen}
                        imageOpen={imageOpen}
                        media={preview?.type === "image" ? preview : null}
                        close={setPreview}
                    />
                    {media.locked && <LockedMediaOverlay />}
                </div>
            ))}
        </>
    );
};
const LockedMediaOverlay = () => {
    return (
        <div className="lock-icon absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 backdrop-blur-md md:backdrop-blur-lg bg-opacity-40 cursor-not-allowed">
            <LucideLock stroke="white" size={30} strokeWidth={2} />
        </div>
    );
};

const PreviewMediaOverlayVideo = ({
    media,
    close,
}: {
    media: MediaType;
    close: React.Dispatch<SetStateAction<MediaType | null>>;
}) => {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                close({ media: "", type: "" });
            }}
            className={`fixed transition-all ease-in-out duration-200 inset-0 w-full flex items-center justify-center bg-black z-50 bg-opacity-20
            ${media?.media ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}
        >
            <div className="p-4">
                <VideoPlayer link={media?.media} />
            </div>
        </div>
    );
};
const PreviewMediaOverlayImage = ({
    media,
    imageOpen,
    close,
    setImageOpen
}: {
    media: MediaType;
    imageOpen: boolean;
    close: React.Dispatch<SetStateAction<MediaType | null>>;
    setImageOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                close({ media: "", type: "" });
                setImageOpen(false)
            }}
            className={`fixed transition-all ease-in-out duration-300 inset-0 w-full flex items-center justify-center bg-black z-50 bg-opacity-20
            ${imageOpen ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}
        >
            <div className="p-4">
                <Image
                    width={1200}
                    height={1200}
                    priority
                    src={media ? media?.media : "/site/dark.svg"}
                    className={`w-screen md:w-[550px] object-cover transition-all duration-300 ${imageOpen ? "scale-100" : "scale-75"
                        }`}
                    alt=""
                />
            </div>
        </div>
    );
};

export default MediaPanelImageCard;

