﻿"use client"
import usePostComponent from "@/contexts/post-component-preview";
import {useEffect, useState} from "react";
import Image from "next/image";

const PostComponentPreview = () => {
    const {url, type, open, close} = usePostComponent();

    const [activeMedia, setActiveImage] = useState<string | null>(null)

    useEffect(() => {
        if (open) {
            setActiveImage(url)
        } else {
            setActiveImage(null)
        }
    }, [url, open]);

    if (!activeMedia) return <p className={'text-white text-2xl'}> Loading... </p>

    return (
        <div
            onClick={(e) => {
                e.currentTarget.classList.remove("opacity-100")
                close()
            }}
            className={`fixed ease-in-out inset-0 w-full flex items-center justify-center bg-black z-50 bg-opacity-90
            ${open ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}>
            <div className="p-4">
                <div className={``} onClick={(e) => e.stopPropagation()}>
                    {type === "video" ? (
                        <video width={1000} height={1000} autoPlay loop controls
                               className={`w-screen md:w-[550px] block object-cover transition-all duration-300 border-none ${open ? "scale-100" : "scale-75"}`}>
                            <source src={`${activeMedia ? activeMedia : ""}`} type="video/mp4"/>
                        </video>
                    ) : (
                        <Image src={`${activeMedia ? activeMedia : ""}`} width={1000} height={1000} priority
                               className={`w-screen md:w-[550px] block object-cover transition-all duration-300 border-none ${open ? "scale-100" : "scale-75"}`}
                               alt="image preview"/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostComponentPreview;