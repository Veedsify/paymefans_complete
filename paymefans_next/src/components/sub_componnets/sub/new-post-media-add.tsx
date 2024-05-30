"use client"
import { useNewPostStore } from "@/contexts/new-post-context";
import toast from "react-hot-toast";
import { HiCamera, HiVideoCamera } from "react-icons/hi"

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
                    <HiCamera size={50}
                        className='border border-gray-400 p-2 rounded-lg'
                    />
                </label>
                <input type="file" accept="image/*, video/*" multiple
                    onChange={handleImageSelect}
                    id="attachments" className="hidden" name="attachments" />
                <input type="file" className="hidden" id="flie" capture="environment" />
                <label htmlFor="flie" className='cursor-pointer'>
                    <HiVideoCamera size={50} strokeWidth={1}
                        className="border border-gray-400 p-2 rounded-lg"
                    />
                </label>
            </div>
        </>
    )
}

export default NewPostMediaAdd