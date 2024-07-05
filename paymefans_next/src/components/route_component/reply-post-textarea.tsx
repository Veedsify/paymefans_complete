"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucideCamera, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from 'emoji-picker-react';
import { imageTypes } from "@/lib/filetypes";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuid } from "uuid";


export interface ReplyPostProps {
    options: {
        post_id: string
        post_audience: string
        author_username: string
        reply_to?: string
    };
    isSubscriber: boolean
}
export const ReplyPostComponent = ({
    options,
    isSubscriber
}: ReplyPostProps) => {
    const { user } = useUserAuthContext()
    const [replyPostOpen, setReplyPostOpen] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [typedComment, setTypedComment] = useState<string>('');
    const [Files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleTextAreaFocus = () => {
        setReplyPostOpen(true);
    }

    const handleTypedComment = useCallback((e: any) => {
        setTypedComment(e.target.value);
    }, [])

    useEffect(() => {
        setUploadedFiles(Files);
    }, [Files]);

    const handleFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.currentTarget.files;
        if (fileList) {
            if (fileList.length > 5) {
                return toast.error("You can only upload 5 files at a time");
            }

            if (Files.length + fileList.length > 5) {
                return toast.error("You can only upload 5 files at a time");
            }

            const filesArray = Array.from(fileList); // Convert FileList to File[]
            filesArray.forEach((file) => {
                if (!imageTypes.includes(file.type)) {
                    toast.error("Only images are allowed");
                    return false;
                }
                setFiles((prev) => [...prev, file]);
            })
        }
    }, [setFiles, Files]);


    const removeFile = (file: File) => {
        const newFiles = Files.filter((f) => f !== file);
        setFiles(newFiles);
    }

    return (
        <div>
            {/* {!(!isSubscriber && options?.post_audience === "subscribers") && ( */}
            <div className="flex gap-4 items-start mt-5">
                <div className="flex items-center gap-2">
                    <Image width={80} height={80} src={user ? user.profile_image : "/site/avatar.png"} alt="" className="w-10 md:w-16 h-auto rounded-full aspect-square object-cover" />
                </div>
                <div className="flex-1">
                    <p className="mb-3 p-3 text-sm font-semibold">
                        Replying to <span className="font-bold text-primary-dark-pink">{options.author_username}</span>
                    </p>
                    <textarea name=""
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                setReplyPostOpen(false);
                            }
                        }}
                        onFocus={handleTextAreaFocus}
                        id=""
                        onChange={handleTypedComment}
                        placeholder="Type a reply"
                        className={`block w-full outline-none p-3 pt-0 resize-none ${replyPostOpen ? "h-52" : "h-auto"}`}></textarea>
                    {Files.length > 0 && (
                        <div className="flex items-center flex-wrap gap-4">
                            {Files.map((file: File, index: number) => (
                                <FilesHolder key={uuid()} file={file} remove={removeFile} uploadedFiles={uploadedFiles} />
                            ))}
                        </div>

                    )}
                    <div className="flex p-3 gap-4">
                        <CommentsCamera
                            handleFiles={handleFiles}
                        />
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
            {/* )} */}
        </div >
    )
}



const FilesHolder = ({ file, remove, uploadedFiles }: { file: File, remove: (e: File) => void, uploadedFiles: File[] }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = useCallback(async () => {
        if (uploadedFiles.includes(file)) {
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            setIsUploading(true);
            const res = await axios.post("", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                    setUploadProgress(percentCompleted);
                }
            });
            setUploadedUrl(res.data.url);
            setIsUploading(false);
        } catch (error) {
            setIsUploading(false);
            toast.error("Failed to upload file");
        }
    }, [file, uploadedFiles]);

    useEffect(() => {
        uploadFile();
    }, [uploadFile]);

    return (
        <div className="relative w-[100px] aspect-square">
            {isUploading ? (
                <div className="absolute inset-0 w-full aspect-square flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="text-white">{uploadProgress}%</div>
                </div>
            ) : (
                <Image
                    src={uploadedUrl || URL.createObjectURL(file)}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-lg aspect-square w-full shadow-lg bg-white object-cover"
                />
            )}
            <span className="absolute top-0 right-0 bg-black text-white flex items-center justify-center w-7 h-7 rounded-full cursor-pointer"
                onClick={() => remove(file)}
            >
                <X size={20} strokeWidth={3} />
            </span>
        </div>
    );
};

const CommentsCamera = ({ handleFiles }: { handleFiles: (e: ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <span className="cursor-pointer">
            <label htmlFor="file" className="cursor-pointer">
                <LucideCamera size={20} />
                <input type="file" name="file" id="file" className="hidden" multiple onChange={handleFiles}
                    accept="image/*"
                />
            </label>
        </span>
    )
}

export default ReplyPostComponent;