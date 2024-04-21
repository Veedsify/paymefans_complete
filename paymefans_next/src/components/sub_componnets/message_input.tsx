"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucidePlus, LucideCamera, LucideSendHorizonal } from "lucide-react";
import { ChangeEvent, RefObject, useRef, useState } from "react";

export interface Message {
    message: string;
    sender: string;
    attachment?: string;
}
export interface MessageInputProps {
    sendMessage: ({
        message,
        sender,
        attachment,
    }: Message) => void;
}

const MessageInput = ({ sendMessage }: MessageInputProps) => {
    const [message, setMessage] = useState("");
    const { user } = useUserAuthContext()
    const ref = useRef<HTMLTextAreaElement>(null);
    const setMessageInput = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)

    const sendNewMessage = () => {
        if (!message) return;
        sendMessage({
            message,
            sender: user?.id as string,
        });
        setMessage("");
        ref.current?.value = "";
    }

    return (
        <div className="position-fixed bottom-0 
        lg:mx-4">
            <div className="flex items-center gap-5 px-6 bg-gray-100 lg:py-2 py-4 lg:rounded-xl">
                <textarea
                    ref={ref as RefObject<HTMLTextAreaElement>}
                    onChange={setMessageInput}
                    placeholder="Type your message...." className="bg-transparent outline-none w-full p-2 font-semibold resize-none"></textarea>
                <span className="cursor-pointer">
                    <LucidePlus fill="#fff" stroke="#CC0DF8" size={25} />
                </span>
                <span className="cursor-pointer">
                    <LucideCamera fill="#fff" stroke="#CC0DF8" size={25} />
                </span>
                <span className="cursor-pointer" onClick={sendNewMessage}>
                    <LucideSendHorizonal fill="#fff" stroke="#CC0DF8" size={25} />
                </span>
            </div>
        </div>
    );
}

export default MessageInput;