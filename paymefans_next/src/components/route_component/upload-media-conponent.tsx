"use client"
import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import MediaPreviewer from '../sub_componnets/upload-media-preview';
import { Attachment } from '../sub_componnets/message_input';

type UploadMediaCompProps = {
    open: boolean;
    close: () => void;
    sendNewMessage: (attachment: Attachment[]) => void;
    setMessage: (message: string) => void;
    message: string;
}
const UploadMediaComponent: React.FC<UploadMediaCompProps> = ({ open, close, setMessage, sendNewMessage, message }) => {
    const [files, setFiles] = useState<FileList | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleMultipleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml", "image/webp", "image/bmp", "image/tiff", "image/ico"];
        const videoTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (e.target.files) {
            const isValidType = imageTypes.includes(e.target.files[0].type) || videoTypes.includes(e.target.files[0].type);
            if (!isValidType) {
                toast.error("Invalid file type");
                return;
            }
            setFiles(e.target.files);
        }
    }, []);

    const closeModal = useCallback(() => {
        setFiles(null);
        close()
    }, [setFiles, close])

    return (
        <div className={`fixed bg-white inset-0  w-full min-h-screen z-[999] ${open ? "block" : "hidden"}`}>
            <div className="flex items-center justify-center h-full w-full p-2 relative">
                <div className="absolute top-[3%] rounded-full bg-white p-3 shadow-lg cursor-pointer" onClick={closeModal}>
                    <X size={30} stroke='#000' className='p-0 m-0' />
                </div>
                {files && files.length > 0 ? (
                    <MediaPreviewer close={closeModal} files={files} setMessage={setMessage} message={message} sendNewMessage={sendNewMessage} />
                ) : (
                    <>
                        <input
                            ref={inputRef}
                            onChange={handleMultipleFileSelect}
                            type="file" id="fileUpload" name="fileUpload" className="hidden" multiple />
                        <label htmlFor="fileUpload" className="flex flex-col items-center p-6 border rounded-lg md:w-2/5 w-4/5 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 mb-5 rounded-full">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <p className="mt-2 font-medium text-gray-900">Drag and drop your media here</p>
                            <p className="mt-2 text-sm text-gray-500 mb-5">or</p>
                            <p className="mt-2 px-5 py-3 font-bold bg-primary-dark-pink text-white bg rounded-md">Select Media</p>
                        </label>
                    </>
                )}
            </div>
        </div>
    );
}
export default UploadMediaComponent;
