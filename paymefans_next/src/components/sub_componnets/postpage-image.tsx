"use client";
import { useCallback, useState } from "react";
import { HiPlay } from "react-icons/hi";
import usePostComponent from "@/contexts/post-component-preview";
import Image from "next/image";
import swal from "sweetalert";

export const PostPageImage = ({ media: { media_type, poster, url } }: {
    media: {
        media_type: string;
        poster?: string | null;
        url: string;
    }
}) => {
    const { fullScreenPreview } = usePostComponent();
    const [canplay, setCanplay] = useState(false);
    const handleClick = useCallback(() => {
        if (media_type === "video" && canplay) {
            swal({
                title: "Video not ready",
                text: "Please wait for the video to load",
                icon: "warning",
                timer: 2000,
            })
            return
        }
        fullScreenPreview({ url, type: media_type, open: true });
    }, [fullScreenPreview, media_type, url, canplay]);

    return (
        <div className="relative">
            {media_type === "video" ? (
                <div className="relative">
                    <video
                        onClick={handleClick}
                        className="w-full rounded-lg mt-3 block aspect-square object-cover cursor-pointer"
                        onLoad={e => setCanplay(true)}
                        poster={""}
                    >
                        <source src={url} />
                    </video>
                    <div
                        onClick={handleClick}
                        className="absolute inset-0 text-white bg-black bg-opacity-50 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                        <button className="h-12 w-12 p-1 flex-shrink-0 rounded-full flex items-center justify-center bg-primary-dark-pink aspect-square">
                            <HiPlay className="text-white" size={50} />
                        </button>
                    </div>
                </div>
            ) : (
                <Image
                    unoptimized
                    height={300}
                    priority
                    width={300}
                    onClick={handleClick}
                    src={url}
                    blurDataURL={url}
                    alt=""
                    className="w-full rounded-lg mt-3 block aspect-square object-cover cursor-pointer"
                />
            )}
        </div>
    );
};
