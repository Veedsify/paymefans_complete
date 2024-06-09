"use client"
import usePostComponent from "@/contexts/post-component-preview";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Loader from "../lib_components/loading-animation";
import { X } from "lucide-react";

const PostComponentPreview = () => {
    const { url, type, open, close } = usePostComponent();
    const [activeMedia, setActiveImage] = useState<string | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const handleLoaded = () => setLoaded(!loaded)
    const ref = React.useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    useEffect(() => {
        const handleCloseOnDragStart = () => {
            if (ref.current) {
                ref.current.classList.add('slide-down');
                // Close after the animation duration
                setTimeout(() => {
                    close();
                }, 500); // Match this duration with the CSS animation duration
            }
        }

        if (ref.current) {
            window.addEventListener("dragstart", handleCloseOnDragStart);
        }

        return () => {
            window.removeEventListener("dragstart", handleCloseOnDragStart);
        }
    }, [ref, close]);


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
                ref={ref}
                onClick={(e) => {
                    close()
                }}
                className={`fixed ease-in-out inset-0 w-full min-h-screen flex items-center justify-center z-50 smooth-opacity ${open ? "active" : ""}`}>
                <>
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full text-black shadow-md z-50"
                    >
                        <X size={40} />
                    </button>
                    {type === "video" && (
                        <video
                            controlsList="nodownload"
                            autoPlay controls
                            playsInline
                            className={`w-screen md:w-[550px] lg:w-[650px] 2xl:w-[700px] block object-cover transition-all duration-300 bg-black border-none h-auto animate-in ${open ? "scale-100" : "scale-75"}`}
                        >
                            <source src={activeMedia} type="video/mp4" />
                        </video>
                    )}
                    {(type === "image") && (
                        <div className="relative w-fit h-screen"
                        >
                            <Image
                                onLoad={handleLoaded}
                                width={2000}
                                height={2000}
                                draggable={false}
                                src={activeMedia} priority
                                onClick={e => e.stopPropagation()}
                                className={`h-full object-contain flex-grow-0 transition-all duration-200 border-none animate-in`}
                                alt=""
                            />
                            <div className="add-loaders opacity-70">
                                {!loaded ? <Loader /> : ""}
                            </div>
                        </div>
                    )}
                </>
            </div >
        </>
    )
}

export default PostComponentPreview;