"use client"
import { LucideLoader, LucideLock, LucidePlay } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import usePostComponent from "@/contexts/post-component-preview";
import { getToken } from "@/utils/cookie.get";
import InfiniteScroll from "react-infinite-scroll-component";
import { MediaDataType } from "@/types/components";

const MediaPanelImageCard = ({ sort }: { sort: string }) => {
    const [data, setData] = useState<MediaDataType[]>([]);
    const [sorted, setSorted] = useState<MediaDataType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { fullScreenPreview } = usePostComponent();
    const token = getToken();
    const [hasMore, setHasMore] = useState(true);

    const sortData = (data: MediaDataType[]) => {
        return sort === "all" ? data : data.filter((media) => media.media_type === sort);
    };

    useEffect(() => {
        setSorted(sortData(data));
    }, [data, sort]);

    const PreviewImageHandler = (
        media: string,
        type: string,
        isSubscriber: boolean
    ) => {
        if (isSubscriber === false) return;
        fullScreenPreview({ url: media, type, open: true });
    };

    const fetchInitialData = useCallback(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/media?page=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        setData(data.data);
        setTotalPages(data.total);
        setHasMore(data.data.length > 0);
        setPage(2); // Start with the next page
    }, [token]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const fetchAdditionalData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/media?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        setData((prev) => [...prev, ...data.data]);
        setHasMore(data.data.length > 0);
        setPage((prev) => prev + 1); // Increment the page after fetching data
    };

    return (
        <>
            <InfiniteScroll
                next={fetchAdditionalData}
                dataLength={data.length}
                hasMore={hasMore}
                loader={<div className="flex justify-center col-span-3"> <LucideLoader size={30} className="animate-spin" stroke="purple" /></div>}
                className="grid grid-cols-3 gap-1 mb-20 select-none"
                endMessage={<p className="col-span-3 py-4 text-center">No more media</p>}
            >
                {sorted.map((media, index) => (
                    <div key={index} className="aspect-square overflow-hidden relative">
                        <MediaPanelMediaCard isSubscriber={true} media={media} PreviewImageHandler={PreviewImageHandler} />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
};

const LockedMediaOverlay = () => {
    return (
        <div className="lock-icon absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 bg-opacity-40 cursor-not-allowed">
            <LucideLock stroke="white" size={30} strokeWidth={2} />
        </div>
    );
};

interface MediaPanelMediaCardProps {
    media: MediaDataType;
    PreviewImageHandler: (media: string, type: string, isSubscriber: boolean) => void;
    isSubscriber: boolean;
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
                        className="w-[400px] h-[400px] cursor-pointer object-cover transition-all duration-300 ease-in-out"
                        width={400}
                        height={400}
                        onClick={() => PreviewImageHandler(media.url, media.media_type, isSubscriber)}
                    />
                    <div
                        onClick={() => PreviewImageHandler(media.url, media.media_type, isSubscriber)}
                        className="absolute bg-black w-full h-full inset-0 bg-opacity-20 cursor-pointer flex items-center justify-center"
                    >
                        <LucidePlay stroke="white" size={30} strokeWidth={2} />
                    </div>
                </div>
            ) : (
                <Image
                    width={400}
                    height={400}
                    priority
                    onClick={() => PreviewImageHandler(media.url, media.media_type, isSubscriber)}
                    src={isSubscriber ? media.url : media.blur}
                    alt=""
                    className="w-full h-full cursor-pointer object-cover transition-all duration-300 ease-in-out hover:scale-105"
                />
            )}
            {!isSubscriber && <LockedMediaOverlay />}
        </>
    );
};

export default MediaPanelImageCard;
