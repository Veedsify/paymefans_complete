"use client"
import usePostComponent from "@/contexts/post-component-preview";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "../lib_components/loading-animation";

const PostComponentPreview = () => {
    const { url, type, open, close } = usePostComponent();
    const [activeMedia, setActiveImage] = useState<string | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const handleLoaded = () => setLoaded(!loaded)
    useEffect(() => {
        if (open) {
            setActiveImage(url)
        } else {
            setActiveImage(null)
        }
    }, [url, open]);

    useEffect(() => {
        setLoaded(false)
    }, [activeMedia])

    if (!activeMedia) return null

    return (
        <>
            <div
                onClick={(e) => {
                    e.currentTarget.classList.remove("opacity-100")
                    close()
                }}
                className={`fixed ease-in-out inset-0 w-full flex items-center justify-center bg-slate-950 z-50 bg-opacity-95 ${open ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}>
                <div className="p-4">
                    <div className={`max-h-[96vh] overflow-y-auto relative`} onClick={(e) => e.stopPropagation()}>
                        <>
                            {type === "video" && (
                                <div>
                                    <video
                                        width={1000} height={1000} autoPlay loop controls
                                        className={`w-screen md:w-[550px] lg:w-[680px] block object-cover transition-all duration-300 border-none h-auto ${open ? "scale-100" : "scale-75"}`}
                                    >
                                        <source src={activeMedia} type="video/mp4" />
                                    </video>
                                </div>
                            )}
                            {(type === "image") && (
                                <div className="relative">
                                    <Image
                                        onLoad={handleLoaded}
                                        src={activeMedia} width={680} height={680} priority
                                        className={`md:w-[550px] bg-white lg:w-[680px] block object-cover transition-all duration-200 border-none animate-in`}
                                        alt="image preview"
                                    />
                                    <div className="add-loaders">
                                        {!loaded ? <Loader /> : ""}
                                    </div>
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostComponentPreview;