"use client"
import { LucideLoader, LucideLock, LucidePlay } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import usePostComponent from "@/contexts/post-component-preview";
import { getToken } from "@/utils/cookie.get";
import InfiniteScroll from "react-infinite-scroll-component";

type MediaType = { media: string; type: string } | null;
type MediaDataType = {
    id: number;
    url: string;
    blur: string;
    locked: boolean;
    media_type: string,
    poster?: string
};

const MediaPanelImageCard = ({ sort }: { sort: string }) => {
    const [data, setData] = useState<MediaDataType[]>([]);
    const [sorted, setSorted] = useState<MediaDataType[]>([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { fullScreenPreview } = usePostComponent()
    const token = getToken()

    const sortThisMedia = useCallback(() => {
        const mediasort =
            sort === "all" ? data : data.filter((media) => media.media_type === sort);
        setSorted(mediasort);
    }, [sort, data])

    useEffect(() => {
        sortThisMedia()
    }, [sortThisMedia]);

    const PreviewImageHandler = (
        media: string,
        type: string,
        isSubscriber: boolean
    ) => {
        if (isSubscriber === false) return;
        fullScreenPreview({ url: media, type, open: true });
    };

    useEffect(() => {
        const fetinitialData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/media?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json()
            setData(data.data)
            setSorted(data.data)
            setTotalPages(data.total)
        }
        fetinitialData()
    }, [token, page])

    const fetchAdditionalData = async () => {
        setPage(page + 1);
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/media?page=${page + 1}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json()
        setData((prev) => {
            return prev.map((media: MediaDataType) => {
                return data.data.map((newMedia: MediaDataType) => {
                    if (media.id !== newMedia.id) {
                        return newMedia
                    } else {
                        return media
                    }
                })
            })
        })
        setSorted(prev => ([
            ...prev, ...data.data
        ]))
    }

    return (
        <>
            <InfiniteScroll
                next={fetchAdditionalData}
                dataLength={totalPages}
                hasMore={data.length < totalPages}
                loader={<LucideLoader className="animate-spin" size={45} />}
                className="grid grid-cols-3 gap-1 mb-20 select-none"
                endMessage={<p className="col-span-3 py-4 text-center">No more media</p>}
            >
                {sorted.map((media, index) => (
                    <div key={index} className="aspect-square overflow-hidden relative ">
                        <MediaPanelMediaCard isSubscriber={true} media={media} PreviewImageHandler={PreviewImageHandler} />
                    </div >
                ))}
            </InfiniteScroll >
        </>
    );
};

const MemoizedMediaPanelImageCard = React.memo(MediaPanelImageCard);
MemoizedMediaPanelImageCard.displayName = 'MediaPanelImageCard';

const LockedMediaOverlay = () => {
    return (
        <div
            className="lock-icon absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 bg-opacity-40 cursor-not-allowed">
            <LucideLock stroke="white" size={30} strokeWidth={2} />
        </div>
    );
};

interface MediaPanelMediaCardProps {
    media: MediaDataType;
    PreviewImageHandler: (media: string, type: string, isSubscriber: boolean) => void;
    isSubscriber: boolean
}

const MediaPanelMediaCard = ({ media, PreviewImageHandler, isSubscriber }: MediaPanelMediaCardProps) => {
    return (
        <>
            {media.media_type === "video" ? (
                <div className="relative w-full h-full">
                    <Image
                        src={media?.poster || ""}
                        alt="video poster"
                        priority
                        className=" w-[400px] h-[400px] cursor-pointer object-cover transition-all duration-300 ease-in-out" width={400}
                        height={400}
                        onClick={() => PreviewImageHandler(media.url, media.media_type, isSubscriber)}
                    />
                    <div
                        onClick={() => PreviewImageHandler(media.url, media.media_type, isSubscriber)}
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
                        PreviewImageHandler(media.url, media.media_type, isSubscriber)
                    }
                    src={isSubscriber ? media.url : media.blur}
                    alt=""
                    className=" w-full h-full cursor-pointer object-cover transition-all duration-300 ease-in-out hover:scale-105"
                />
            )}
            {!isSubscriber && <LockedMediaOverlay />}
        </>
    )
}


export default MediaPanelImageCard;

