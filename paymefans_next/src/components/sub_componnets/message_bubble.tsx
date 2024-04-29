"use client"

import { useUserAuthContext } from "@/lib/userUseContext";

type MessageBubbleProps = {
    message?: string;
    attachment?: {
        type: 'image' | 'video' | 'audio' | 'file';
        url: string;
    };
    sender: string;
    seen: boolean;
    date: Date | undefined
}
const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, seen, message, date }) => {
    const { user } = useUserAuthContext()
    const isValidDate = (value: any): value is Date => {
        return value instanceof Date && !isNaN(value as any);
    };
    return (
        <div className="flex items-center">
            {message && sender === user?.user_id ? (
                <div className="ml-auto max-w-[85%] md:max-w-[60%]">
                    <div className="bg-gray-100 p-4 rounded-2xl font-medium rounded-br-3xl">
                        <div className="leading-relaxed w-full text-wrap">{message}</div>
                    </div>
                    <small className="text-xs  mt-2 pt-1 float-right flex items-center">
                        {isValidDate(date) && date.toLocaleTimeString()}
                        <span className={`ml-2 h-3 w-3 rounded-full ${seen ? "bg-primary-dark-pink" : "bg-gray-300"} inline-block`}>
                        </span>
                    </small>
                </div>
            ) : message && sender !== user?.user_id ? (
                <div className="max-w-[85%] md:max-w-[60%]">
                    <div className="bg-primary-dark-pink text-white font-medium p-4 rounded-2xl rounded-bl-3xl">
                        <div className="leading-relaxed ">{message}</div>
                    </div>
                    <small className="text-xs mt-2 flex items-center">
                        {isValidDate(date) && date.toLocaleTimeString()}
                    </small>
                </div>
            ) : ""}
        </div>
    );
}

export default MessageBubble;