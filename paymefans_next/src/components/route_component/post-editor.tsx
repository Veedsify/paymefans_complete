"use client"
import { useNewPostStore } from "@/contexts/new-post-context";
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucideChevronDown, LucideChevronUp, LucideLock, LucideUsers } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { PostCancelComp } from "../sub_componnets/sub/post-cancel-comp.";
import toast from "react-hot-toast";
import PostMediaPreview from "./post-media-preview";
import axios from "axios";
import { SavePost } from "@/utils/save-post";
import { useRouter } from "next/navigation";

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
    const router = useRouter()
    const [dropdown, setDropdown] = useState(false);
    const [wordLimit, setWordLimit] = useState(1000);
    const { user } = useUserAuthContext();
    const { setVisibility, visibility, setPostText, postText } = useNewPostStore();
    const [postAudience, setPostAudience] = useState<postAudienceDataProps>({} as postAudienceDataProps);
    const [media, setMedia] = useState<File[] | null>(null)

    const ref = useRef<HTMLButtonElement>();
    const audience = useMemo(() => {
        return postAudienceData.find((audience) => audience.name === visibility) || postAudienceData[0];
    }, [visibility]);
    useEffect(() => {
        setPostAudience(audience);
    }, [setPostAudience, audience])

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
    const checkLimit = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const count = e.target.value.length;
        setWordLimit(limit - count);
        setPostText(e.target.value);
        if (count > limit) {
            setWordLimit(0);
            e.target.value = e.target.value.slice(0, limit);
        }
    }, [setPostText])

    const handleMediaAttachment = useCallback((files: File[] | null) => {
        setMedia(files);
    }, [setMedia])

    const handlePostSubmit = useCallback(async () => {
        if (!postText || postText.trim() === "") {
            toast.error("Post is empty, Please write something.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("content", postText);
            if (media) {
                media.forEach((file) => {
                    formData.append("media[]", file);
                })
            }

            formData.append("visibility", visibility.toLowerCase());
            toast.loading("Creating post...");
            const res = await SavePost(formData);

            if (res && res.status === true) {
                router.push(`/posts/${res.data.post_id}`)
                setPostText("");
                setVisibility("Public")
                toast.dismiss()
                toast.success("Post created successfully");
            }

            if (res && res.status === false) {
                toast.error(res.message)
            }

        } catch (error) {
            toast.dismiss()
            toast.error("Something went wrong, Please try again later.");
        }
    }, [postText, media, visibility])

    return (
        <>
            <div className="md:p-8 p-4">
                <div className="flex items-center mb-6">
                    <PostCancelComp />
                    <button
                        onClick={handlePostSubmit}
                        className="bg-primary-dark-pink text-white p-1 px-6 rounded ml-auto text-sm font-medium">
                        Post
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <Image src={user?.profile_image || "/site/avatar.png"} alt="" width={56} height={56} className="w-14 border border-gray-800 inline-block rounded-full" />
                    <button
                        className="border inline-block border-gray-800 ml-2 rounded-3xl px-3 text-gray-800 text-sm relative">
                        <span className="flex gap-2 items-center font-medium text-sm p-2 transition-all duration-300 cursor-pointer"
                            onClick={() => setDropdown(!dropdown)}
                        >
                            {postAudience.icon} {postAudience.name}
                            {dropdown ? (<LucideChevronUp size={20} className="inline" />) : (<LucideChevronDown size={20} className="inline" />)}
                        </span>
                        <div className={`absolute w-full left-0 mt-0 transition-all duration-300 ${dropdown ? "opacity-100 -translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                            <ul
                                className="bg-white rounded-2xl overflow-hidden mt-2 border border-gray-800 text-left w-full">
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
                    className="block border border-gray-500 rounded-md mb-3 leading-relaxed text-gray-700 font-medium w-full resize-none p-3 outline-none mt-3 overflow-auto h-[40vh]"
                    placeholder="What’s on your mind?"
                    defaultValue={postText}
                    onChange={checkLimit}></textarea>
                <div>
                    <p className="text-xs text-gray-400 font-medium">
                        {wordLimit} characters remaining
                    </p>
                </div>
            </div>
            <PostMediaPreview submitPost={handleMediaAttachment} />
        </>
    )

}

export default PostEditor