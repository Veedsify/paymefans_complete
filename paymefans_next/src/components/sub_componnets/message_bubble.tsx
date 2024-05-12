"use client"
import { useUserAuthContext } from "@/lib/userUseContext";

type MessageBubbleProps = {
    message?: string | TrustedHTML;
    attachment?: {
        type: 'image' | 'video' | 'audio' | 'file';
        url: string;
    };
    sender: string;
    seen: boolean;
    date: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, seen, message, date }) => {
    const { user } = useUserAuthContext()
    const dateString = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString();
    return (
        <div className="flex items-center">
            {message && sender === user?.user_id ? (
                <div className="ml-auto max-w-[85%] md:max-w-[60%]">
                    <div className="bg-gray-100 p-4 rounded-full font-medium rounded-br-3xl">
                        <div className="leading-relaxed w-full text-wrap" dangerouslySetInnerHTML={{ __html: message }}></div>
                    </div>
                    <small className="text-xs  mt-2 pt-1 float-right flex items-center">
                        {dateString}
                        <span className={`ml-2 h-3 w-3 rounded-full ${seen ? "bg-primary-dark-pink" : "bg-gray-300"} inline-block`}>
                        </span>
                    </small>
                </div>
            ) : message && sender !== user?.user_id ? (
                <div className="max-w-[85%] md:max-w-[60%]">
                    <div className="bg-primary-dark-pink text-white font-medium p-4 rounded-full rounded-bl-3xl">
                        <div className="leading-relaxed " dangerouslySetInnerHTML={{ __html: message }}></div>
                    </div>
                    <small className="text-xs mt-2 flex items-center">
                        {dateString}
                    </small>
                </div>
            ) : ""}
        </div>
    );
}

export default MessageBubble;