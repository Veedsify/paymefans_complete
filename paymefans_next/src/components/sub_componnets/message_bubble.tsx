"use client"

import { useUserAuthContext } from "@/lib/userUseContext";

type MessageBubbleProps = {
    message?: string;
    attachment?: {
        type: 'image' | 'video' | 'audio' | 'file';
        url: string;
    };
    sender: string;
}
const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, message }) => {
    const { user } = useUserAuthContext()
    return (
        <div className="flex items-center">
            {message && sender === user?.id ? (
                <div className="ml-auto max-w-[85%] md:max-w-[60%]">
                    <div className="bg-gray-100 p-4 rounded-2xl font-medium rounded-br-3xl">
                        <div className="leading-relaxed w-full text-wrap">{message}</div>
                    </div>
                    <small className="text-xs  mt-2 pt-1 float-right flex items-center">8:43 PM
                        <span className="ml-2 h-3 w-3 rounded-full bg-primary-dark-pink inline-block">
                        </span>
                    </small>
                </div>
            ) : message && sender !== user?.id ? (
                <div className="max-w-[85%] md:max-w-[60%]">
                    <div className="bg-primary-dark-pink text-white font-medium p-4 rounded-2xl rounded-bl-3xl">
                        <div className="leading-relaxed ">{message}</div>
                    </div>
                    <small className="text-xs mt-2 flex items-center">8:43 PM
                        <span className="ml-2 h-3 w-3 rounded-full bg-gray-300 inline-block">

                        </span>
                    </small>
                </div>
            ) : ""}
        </div>
    );
}

export default MessageBubble;