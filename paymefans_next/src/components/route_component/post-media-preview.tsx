import Image from "next/image";
import React from "react";


function PostMediaPreview() {
    return (
        <>
            <div className="md:p-8 p-4">
                <div className="flex items-center gap-3 overflow-x-auto">
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                    <Image src="/images/register_image.png" alt="1" width={150} height={150} className="object-cover h-auto aspect-square shadow-lg border block rounded-xl" />
                </div>
            </div>
        </>
    );
}

export default PostMediaPreview;
