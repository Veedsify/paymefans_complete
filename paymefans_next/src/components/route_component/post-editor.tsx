"use client"
import { useNewPostStore } from "@/contexts/new-post-context";
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucideChevronDown, LucideChevronUp, LucideLock, LucideUsers } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";

type postAudienceDataProps = {
    id?: number;
    name?: "Public" | "Subscribers" | "Private";
    icon?: JSX.Element;
}
const postAudienceData: postAudienceDataProps[] = [{
    id: 1,
    name: "Public",
    icon: <HiOutlineEye size={20} className="inline" />
},
{
    id: 2,
    name: "Subscribers",
    icon: <LucideUsers size={20} className="inline" />
},
{
    id: 3,
    name: "Private",
    icon: <LucideLock size={20} className="inline" />
}]
const PostEditor = () => {
    const [dropdown, setDropdown] = useState(false);
    const [wordLimit, setWordLimit] = useState(1000);
    const { user } = useUserAuthContext();
    const { setVisibility, visibility, setPostText, postText } = useNewPostStore();
    const [postAudience, setPostAudience] = useState<postAudienceDataProps>({} as postAudienceDataProps);
    const ref = useRef<HTMLButtonElement>();
    useEffect(() => {
        if (visibility) {
            const audience = postAudienceData.find((audience) => audience.name === visibility) as postAudienceDataProps;
            setPostAudience(audience);
        }
    }, [postAudienceData, visibility, setPostAudience])

    const updatePostAudience = (e: MouseEvent<HTMLLIElement>) => {
        const id = e.currentTarget.getAttribute("data-id");
        const audience = postAudienceData.find((audience) => audience.id === Number(id)) as postAudienceDataProps;
        setPostAudience(audience);
        if (audience.name) {
            setVisibility(audience.name);
        }
        setDropdown(false);
    }

    const limit = 1000;
    const checkLimit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const count = e.target.value.length;
        setWordLimit(limit - count);
        setPostText(e.target.value);
        if (count > limit) {
            setWordLimit(0);
            e.target.value = e.target.value.slice(0, limit);
        }
    }


    return (
        <div className="md:p-8 p-4">
            <div className="flex items-center gap-2">
                <Image src={user?.profile_image || "/site/avatar.png"} alt="" width={56} height={56} className="w-14 border border-gray-800 inline-block rounded-full" />
                <button
                    className="border inline-block border-gray-400 ml-2 rounded-3xl px-3 text-gray-800 text-sm relative">
                    <span className="flex gap-2 items-center font-medium text-sm p-2"
                        onClick={() => setDropdown(!dropdown)}
                    >
                        {postAudience.icon} {postAudience.name}
                        {dropdown ? (<LucideChevronUp size={20} className="inline" />) : (<LucideChevronDown size={20} className="inline" />)}
                    </span>
                    <div className={`absolute w-full left-0 mt-0 transition-all duration-300 ${dropdown ? "opacity-100 -translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                        <ul
                            className="bg-white rounded-2xl overflow-hidden mt-2 border border-gray-400 text-left w-full">
                            {
                                postAudienceData.map((audience) => (
                                    <li key={audience.id}
                                        data-id={audience.id}
                                        onClick={updatePostAudience} className="p-3 pr-5 text-sm flex items-center gap-2 text-gray-600 font-medium hover:bg-violet-50">
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
                className="block border border-gray-100 rounded-md mb-3 leading-relaxed text-gray-700 font-medium w-full resize-none p-6 outline-none mt-3 overflow-auto h-[40vh]"
                placeholder="What’s on your mind?"
                defaultValue={postText}
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