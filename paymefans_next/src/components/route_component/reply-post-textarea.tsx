"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucideCamera, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useState } from "react";
import { imageTypes } from "@/lib/filetypes";
import toast from "react-hot-toast";
import { getToken } from "../../utils/cookie.get";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FileHolderProps {
    file: File;
    remove: (file: File) => void;
}

export interface ReplyPostProps {
    options: {
        id: string;
        post_id: string;
        post_audience: string;
        author_username: string;
        reply_to?: string;
    };
}

const FilesHolder = React.memo(({ file, remove }: FileHolderProps) => {
    const objUrl = URL.createObjectURL(file);
    return (
        <div className="relative w-[100px] aspect-square">
            <Image src={objUrl} alt="" width={100} height={100} className="rounded-lg w-full aspect-square shadow-lg bg-white object-cover" />
            <span className="absolute top-0 right-0 bg-black text-white flex items-center justify-center w-7 h-7 rounded-full cursor-pointer" onClick={() => remove(file)}>
                <X size={20} strokeWidth={3} />
            </span>
        </div>
    );
});
FilesHolder.displayName = "FilesHolder";



export const ReplyPostComponent = ({ options }: ReplyPostProps) => {
    const { user } = useUserAuthContext();
    const [replyPostOpen, setReplyPostOpen] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [typedComment, setTypedComment] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();

    const handleTextAreaFocus = () => setReplyPostOpen(true);

    const handleTypedComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setTypedComment(e.target.value);
    }, []);

    const handleFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList);
            if (newFiles.length > 5 || files.length + newFiles.length > 5) {
                return toast.error("You can only upload 5 files at a time");
            }
            newFiles.forEach((file) => {
                if (!imageTypes.includes(file.type)) {
                    toast.error("Only images are allowed");
                } else {
                    setFiles((prev) => [
                        ...prev,
                        file
                    ]);
                }
            });
        }
    }, [files]);

    const removeFile = useCallback((file: File) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    }, []);

    const handleReplyClicked = async () => {
        if ((!typedComment && files.length == 0)) return toast.error("Comment cannot be empty");
        try {
            const token = getToken();
            const url = `${process.env.NEXT_PUBLIC_EXPRESS_URL}/comment/new`;
            const formData = new FormData();
            formData.append("post_id", options?.post_id);
            formData.append("postId", options?.id)
            formData.append("comment", typedComment);
            formData.append("reply_to", options?.reply_to || "");
            files.forEach((file) => {
                formData.append("files", file);
            });
            // Perform your API call here with axios using the token and url
            const res = await axios.post(url, formData, {
                onUploadProgress(progressEvent) {
                    if (progressEvent) {
                        console.log(progressEvent.loaded / progressEvent.total! * 100 + "%");
                    }
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            const data = res.data;
            if (data.status) {
                toast.success("Comment posted successfully");
                router.refresh()
                setTypedComment("");
                setFiles([]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="flex gap-4 items-start mt-5">
                <div className="flex items-center gap-2">
                    <Image width={80} height={80} src={user?.profile_image || "/site/avatar.png"} alt="" className="w-10 md:w-16 h-auto rounded-full object-cover" />
                </div>
                <div className="flex-1">
                    <p className="mb-3 p-3 text-sm font-semibold">
                        Replying to <span className="font-bold text-primary-dark-pink">{options.author_username}</span>
                    </p>
                    <textarea
                        onBlur={(e) => !e.target.value && setReplyPostOpen(false)}
                        onFocus={handleTextAreaFocus}
                        onChange={handleTypedComment}
                        value={typedComment}
                        placeholder="Type a reply"
                        className={`block w-full outline-none p-3 pt-0 resize-none ${replyPostOpen ? "h-52" : "h-auto"}`}
                    />
                    <div className="flex gap-3 flex-wrap mb-3">
                        {files.map((file, index) => (
                            <FilesHolder key={index} file={file} remove={removeFile} />
                        ))}
                    </div>
                    <div className="flex p-3 gap-4">
                        <span className="cursor-pointer">
                            <label htmlFor="file" className="cursor-pointer">
                                <LucideCamera size={30} />
                                <input type="file" id="file" className="hidden" multiple onChange={handleFiles} accept="image/*" />
                            </label>
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleReplyClicked}
                    className="bg-primary-dark-pink text-white px-6 py-2 rounded-full">Reply</button>
            </div>
        </div>
    );
};

export default ReplyPostComponent;
