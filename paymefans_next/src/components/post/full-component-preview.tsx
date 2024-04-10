"use client"
import usePostComponent from "@/contexts/post-component-preview";
import {useEffect, useState} from "react";
import Image from "next/image";

const PostComponentPreview = () => {
    const {image, open, close} = usePostComponent();
    if (!image) return <> Loading... </>

    const [activeImage, setActiveImage] = useState<string | null>(null)

    useEffect(() => {
        setActiveImage(image)
    }, [image]);


    return (
        <div
            onClick={(e) => {
                e.currentTarget.classList.remove("opacity-100")
                close()
            }}
            className={`fixed transition-all ease-in-out inset-0 w-full flex items-center justify-center bg-black z-50 bg-opacity-90 duration-300
            ${open ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"}`}>
            <div className="p-4">
                <Image src={`${activeImage ? activeImage : ""}`} width={1000} height={1000} priority
                       className={`w-screen md:w-[550px] block object-cover transition-all duration-200 border-none ${open ? "scale-100" : "scale-75"}`}
                       alt="image preview"/>
            </div>
        </div>
    )
}

export default PostComponentPreview;