"use client"
import usePostComponent from "@/contexts/post-component-preview";
import Image from "next/image";
import { useCallback } from "react";
import { HiPlay } from "react-icons/hi";

export const PostPageImage = ({ media }: {
    media: {
        type: string;
        poster?: string | null;
        url: string;
    }
}) => {
    const { fullScreenPreview } = usePostComponent();
    const setActiveImage = useCallback((url: string, type: string) => {
        fullScreenPreview({ url: url, type: type, open: true })
    }, [fullScreenPreview])
    const clickImageEvent = useCallback((media: { url: string; type: string }) => {
        setActiveImage(media.url, media.type)
    }, [setActiveImage])

    return (
        <div className="relative">
            {media.type === "video" ? (
                <div className="relative">
                    <video
                        onClick={() => clickImageEvent(media)}
                        className="w-full rounded-lg mt-3 block aspect-square object-cover cursor-pointer">
                        <source src={media.url} />
                    </video>
                    <div
                        onClick={() => clickImageEvent(media)}
                        className="absolute inset-0 text-white bg-black bg-opacity-50 rounded-lg flex items-center justify-center cursor-pointer">
                        <button className="h-12 w-12 p-1 inline-block flex-shrink-0 rounded-full flex items-center justify-center bg-primary-dark-pink aspect-square">
                            <HiPlay className="text-white" size={50} />
                        </button>
                    </div>
                </div>
            ) : (
                <Image
                    height={300}
                    width={300}
                    priority
                    onClick={() => setActiveImage(media.url, media.type)}
                    src={media.url}
                    alt=""
                    className="w-full rounded-lg mt-3 block aspect-square object-cover cursor-pointer"
                />
            )}
        </div>
    );
}