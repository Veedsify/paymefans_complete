"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucidePlus, LucideCamera, LucideSendHorizonal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    const ref = useRef<HTMLInputElement>(null);
    const setMessageInput = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)

    const sendNewMessage = () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage || trimmedMessage.length === 0) return;
        sendMessage({
            message: trimmedMessage,
            sender: user?.id as string,
        });
        setMessage("");
        if (ref.current) {
            ref.current.value = "";
            ref.current.focus();
        }
    }

    return (
        <div className="position-fixed bottom-0 
        lg:mx-4">
            <div className="flex mb-2 items-center gap-5 px-6 bg-gray-100 lg:py-2 py-4 lg:rounded-xl">
                <input
                    onKeyDown={(e) => {
                        if (e.shiftKey && e.key === "Enter") {
                            return;
                        }
                        if (e.key === "Enter") {
                            sendNewMessage();
                        }
                    }
                    }
                    ref={ref as RefObject<HTMLInputElement>}
                    onChange={setMessageInput}
                    placeholder="Type your message...." className="bg-transparent outline-none w-full p-2 font-semibold resize-none" />
                <span className="cursor-pointer">
                    <LucidePlus fill="#fff" stroke="#CC0DF8" size={25} />
                </span>
                <span className="cursor-pointer">
                    <LucideCamera fill="#fff" stroke="#CC0DF8" size={25} />
                </span>
                <span className="cursor-pointer"
                    onClick={sendNewMessage}>
                    <LucideSendHorizonal fill="#fff" stroke="#CC0DF8" size={25} />
                </span>
            </div>
        </div>
    );
}

export default MessageInput;