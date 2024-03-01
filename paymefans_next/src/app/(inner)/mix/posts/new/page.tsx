"use client"
import Toggle from "@/app/components/sub_componnets/checked";
import swal from 'sweetalert'

import { LucideCamera, LucideChevronDown, LucideChevronUp, LucideEye, LucideLock, LucideUser2 } from "lucide-react";
import { MouseEvent, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
type postAudienceDataProps = {
    id?: number;
    name?: string;
    icon?: JSX.Element;
}
const postAudienceData: postAudienceDataProps[] = [{
    id: 1,
    name: "Public",
    icon: <LucideEye size={20} className="inline" />
},
{
    id: 2,
    name: "Subscribers",
    icon: <LucideUser2 size={20} className="inline" />
},
{
    id: 3,
    name: "Only Me",
    icon: <LucideLock size={20} className="inline" />
}]

const NewPost = () => {
    const [dropdown, setDropdown] = useState(false);
    const [wordLimit, setWordLimit] = useState(1000);
    const navigate = useRouter()
    const [postAudience, setPostAudience] = useState<postAudienceDataProps>({
        id: 1,
        name: "Public",
        icon: <LucideEye size={20} className="inline" />
    });
    const updatePostAudience = (e: MouseEvent<HTMLLIElement>) => {
        const id = e.currentTarget.getAttribute("data-id");
        const audience = postAudienceData.find((audience) => audience.id === Number(id)) as postAudienceDataProps;
        setPostAudience(audience);
        setDropdown(false);
    }

    const limit = 1000;
    const checkLimit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const count = e.target.value.length;
        setWordLimit(limit - count);
        if (count > limit) {
            setWordLimit(0);
            e.target.value = e.target.value.slice(0, limit);
        }
    }

    const confirmCancel = () => {
        swal({
            title: "Are you sure?",
            text: "You want to cancel this post?",
            icon: "/icons/warning.gif",
            className: "mx-auto",
            buttons: {
                cancel: false,
                confirm: {
                    text: "Yes",
                    className: "bg-primary-dark-pink text-white p-2 px-8 rounded ml-auto ",
                    value: "yes"
                }
            }
        }).then((res) => {
            if (res) {
                navigate.push("/")
            }
        })
    }

    return (
        <div className="relative h-full">
            <span className="flex items-center md:p-8 p-4">
                <button onClick={confirmCancel} >Cancel</button>
                <Link href=""
                    className="bg-primary-dark-pink text-white p-2 px-8 rounded ml-auto ">
                    Post
                </Link>
            </span>

            <div className="md:p-8 p-4">
                <div className="flex items-center">
                    <Image src="/images/user.png" alt="" width={48} height={48} className="w-12 inline-block" />
                    <button className="border inline-block border-gray-500 ml-2 rounded-3xl p-1 px-3 text-black text-sm relative">
                        <span className="flex gap-2 items-center font-medium text-xs"
                            onClick={() => setDropdown(!dropdown)}
                        >
                            {postAudience.icon} {postAudience.name}
                            {dropdown ? (<LucideChevronUp size={20} className="inline" />) : (<LucideChevronDown size={20} className="inline" />)}
                        </span>
                        <div className={`absolute w-full left-0 mt-2 transition-all duration-300 ${dropdown ? "opacity-100 -translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                            <ul className="bg-white rounded-xl mt-2 shadow-md text-left w-full">
                                {
                                    postAudienceData.map((audience) => (
                                        <li key={audience.id}
                                            data-id={audience.id}
                                            onClick={updatePostAudience} className="p-2 text-xs flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-100">
                                            {audience.icon}
                                            {audience.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </button>
                </div>

                <textarea
                    className="block border border-gray-100 rounded-md mb-3 text-sm leading-relaxed text-gray-700 font-medium w-full resize-none p-3 outline-none mt-3 overflow-auto h-[40vh]"
                    placeholder="What’s on your mind?"
                    onChange={checkLimit}></textarea>
                <div>
                    <p className="text-xs text-gray-400 font-medium">
                        {wordLimit} characters remaining
                    </p>
                </div>
            </div>

            <div className="absolute bottom-32 lg:bottom-0 lg:mb-2 mb-20 p-2  lg:w-3/5 w-full flex justify-evenly md:justify-start gap-3 items-center">
                <Image
                    src="/site/verification_images.png"
                    alt=""
                    width={40}
                    height={40}
                    className="border border-gray-400 p-2 rounded-lg"
                />

                <input type="file" className="hidden" id="flie" capture="environment" />
                <label htmlFor="flie">
                    <LucideCamera size={40}
                        className="border border-gray-400  text-gray-400 p-2 rounded-lg"
                    />
                </label>
                <Toggle />
                <span className="text-sm font-medium">Enable watermark</span>
            </div>
        </div >
    );
};

export default NewPost;
