"use client"
import { useNewPostStore } from "@/contexts/new-post-context";
import { LucidePaperclip } from "lucide-react";
import toast from "react-hot-toast";
import { HiCamera, HiUser, HiVideoCamera } from "react-icons/hi"
import Toggle from "../checked";

const NewPostMediaAdd = ({
    handleFileSelect
}: {
    handleFileSelect: (files: FileList) => void
}) => {
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            handleFileSelect(files)
            toast.success('Media added successfully')
        }
    }
    return (
        <>
            <div className="md:px-8 px-4 w-full flex md:justify-start gap-3 items-center">
                <label htmlFor="attachments" className='cursor-pointer'>
                    <LucidePaperclip size={40}
                        className='border border-gray-400 p-2 rounded-lg'
                    />
                </label>
                <input type="file" accept="image/*, video/*" multiple
                    onChange={handleImageSelect}
                    id="attachments" className="hidden" name="attachments" />
                <input type="file" className="hidden" id="flie" capture="environment" />
                <label htmlFor="flie" className='cursor-pointer'>
                    <HiUser size={40} strokeWidth={1}
                        className="border border-gray-400 p-2 rounded-lg"
                    />
                </label>
                <div className="flex items-center gap-3">
                    <Toggle
                        state={false}
                    />
                    <small>
                        enable watermark
                    </small>
                </div>
            </div>
        </>
    )
}

export default NewPostMediaAdd