"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucideCamera } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from 'emoji-picker-react';


export interface ReplyPostProps {
    options: {
        post_id: string
        author_username: string
    }
}
const ReplyPostComponent = ({
    options
}: ReplyPostProps) => {
    const { user } = useUserAuthContext()
    const [replyPostOpen, setReplyPostOpen] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);

    const handleTextAreaFocus = () => {
        setReplyPostOpen(true);
    }

    return (
        <div>
            <div className="flex gap-4 items-start">
                <div className="flex items-center gap-2">
                    <Image width={80} height={80} src={user ? user.profile_image : "/site/avatar.png"} alt="" className="w-10 md:w-16 h-auto rounded-full aspect-square object-cover" />
                </div>
                <div className="flex-1">
                    <p className="mb-3 p-3 text-sm">
                        replying to <span className="font-bold text-primary-dark-pink">{options.author_username}</span>
                    </p>
                    <textarea name=""
                        onBlur={() => setReplyPostOpen(false)}
                        onFocus={handleTextAreaFocus}
                        id=""
                        placeholder="Type a reply"
                        className={`block w-full outline-none p-3 pt-0 resize-none ${replyPostOpen ? "h-52" : "h-auto"}`}></textarea>
                    <div className="flex p-3 gap-4">
                        <span className="cursor-pointer">
                            <LucideCamera size={20} />
                        </span>
                        <span className="cursor-pointer">
                            <HiOutlineEmojiHappy size={20} className="mb-2"
                                onClick={() => setEmojiOpen(!emojiOpen)}
                            />
                            <EmojiPicker
                                open={emojiOpen}
                            />
                        </span>
                    </div>
                </div>
                <button className="bg-primary-dark-pink text-white px-6 py-2 rounded-full">Reply</button>
            </div>
        </div >
    )
}

export default ReplyPostComponent;