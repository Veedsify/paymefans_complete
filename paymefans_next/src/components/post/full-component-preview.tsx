﻿"use client"
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
                    close()
                }}
                className={`fixed ease-in-out inset-0 w-full h-screen flex items-center justify-center z-50 smooth-opacity ${open ? "active" : ""}`}>
                <div className="p-4">
                    <div className={`max-h-[96vh] overflow-y-auto relative`} onClick={(e) => e.stopPropagation()}>
                        <>
                            {type === "video" && (
                                <video
                                    autoPlay controls
                                    className={`w-screen md:w-[550px] shadow-lg shadow-primary-dark-pink lg:w-[680px] block object-cover transition-all duration-300 border-none h-auto animate-in ${open ? "scale-100" : "scale-75"}`}
                                >
                                    <source src={activeMedia} type="video/mp4" />
                                </video>
                            )}
                            {(type === "image") && (
                                <div className="relative">
                                    <Image
                                        onLoad={handleLoaded}
                                        quality={100}
                                        src={activeMedia} width={1500} height={1500} priority
                                        className={`md:w-[550px] shadow-lg shadow-primary-dark-pink bg-white lg:w-[680px] block object-cover transition-all duration-200 border-none animate-in`}
                                        alt="image preview"
                                    />
                                    <div className="add-loaders opacity-70">
                                        {!loaded ? <Loader /> : ""}
                                    </div>
                                </div>
                            )}
                        </>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PostComponentPreview;