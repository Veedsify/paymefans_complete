"use client"
import usePostComponent from "@/contexts/post-component-preview";
import Image from "next/image";

export const PostPageImage = ({ media }: {
    media: {
        type: string;
        poster?: string | null;
        url: string;
    }
}) => {
    const { fullScreenPreview } = usePostComponent();
    const setActiveImage = (url: string, type: string) => {
        fullScreenPreview({ url: url, type: type, open: true })
    }
    return (
        <div className="relative">
            {media.type === "video" ? (
                <video
                    onClick={() => setActiveImage(media.url, media.type)}
                    className="w-full rounded-lg mt-3 block aspect-square object-cover cursor-pointer">
                    <source src={media.url} />
                </video>
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