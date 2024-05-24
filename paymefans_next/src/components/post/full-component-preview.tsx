"use client"
import usePostComponent from "@/contexts/post-component-preview";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const PostComponentPreview = () => {
    const { url, type, open, close } = usePostComponent();
    const [activeMedia, setActiveImage] = useState<string | null>(null)

    useEffect(() => {
        if (open) {
            setActiveImage(url)
        } else {
            setActiveImage(null)
        }
    }, [url, open]);

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
                    <div className={`max-h-[96vh] overflow-y-auto bg-white`} onClick={(e) => e.stopPropagation()}>
                        <>
                            {type === "video" ? (
                                <div>
                                    <video
                                        width={1000} height={1000} autoPlay loop controls
                                        className={`w-screen md:w-[550px] lg:w-[680px] block object-cover transition-all duration-300 border-none ${open ? "scale-100" : "scale-75"}`}>
                                        <source src={`${activeMedia ? activeMedia : ""}`} type="video/mp4" />
                                    </video>
                                </div>
                            ) : (
                                <Image src={`${activeMedia ? activeMedia : ""}`} width={1000} height={1000} priority
                                    className={`w-screen md:w-[550px] lg:w-[680px] block object-cover transition-all duration-300 border-none ${open ? "scale-100" : "scale-75"}`}
                                    alt="image preview" />
                            )}

                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostComponentPreview;