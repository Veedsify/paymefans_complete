"use client"
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

function PostMediaPreview() {
    const arr = new Array(4).fill(0);

    const removeThisMedia = (index: number) => {
        console.log('removeThisMedia', index);
    }
    return (
        <>
            <div className="md:p-8 p-4">
                <div className="grid grid-cols-5 lg:grid-cols-12 items-center gap-3 overflow-x-auto select-none">
                    {arr.map((_, index) =>
                        <div className="relative">
                            <Image key={index} src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                            <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-1 w-full h-full rounded-xl flex items-center justify-center">
                                <span onClick={() => removeThisMedia(index)} className="cursor-pointer">
                                    <X size={20} />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PostMediaPreview;
