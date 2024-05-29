"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucideChevronDown, LucideChevronUp, LucideEye, LucideLock, LucideUser2 } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useState } from "react";

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
const PostEditor = () => {
    const [dropdown, setDropdown] = useState(false);
    const [wordLimit, setWordLimit] = useState(1000);
    const { user } = useUserAuthContext();
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
    return (
        <div className="md:p-8 p-4">
            <div className="flex items-center">
                <Image src={user?.profile_image || "/site/avatar.png"} alt="" width={48} height={48} className="w-12 inline-block rounded-full" />
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
    )

}

export default PostEditor