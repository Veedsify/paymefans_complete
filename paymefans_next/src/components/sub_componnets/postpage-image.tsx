"use client";
import { useCallback } from "react";
import { HiPlay } from "react-icons/hi";
import usePostComponent from "@/contexts/post-component-preview";
import Image from "next/image";

export const PostPageImage = ({ media: { type, poster, url } }: {
    media: {
        type: string;
        poster?: string | null;
        url: string;
    }
}) => {
    const { fullScreenPreview } = usePostComponent();

    const handleClick = useCallback(() => {
        fullScreenPreview({ url, type, open: true });
    }, [fullScreenPreview, type, url]);

    return (
        <div className="relative">
            {type === "video" ? (
                <div className="relative">
                    <video
                        onClick={handleClick}
                        className="w-full rounded-lg mt-3 block aspect-square object-cover cursor-pointer"
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
