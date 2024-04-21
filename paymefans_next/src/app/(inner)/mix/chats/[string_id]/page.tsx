"use client"
import MessageBubble from "@/components/sub_componnets/message_bubble";
import MessageInput from "@/components/sub_componnets/message_input";
import { LucideArrowLeft, LucideGrip } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import socketIoClient from "socket.io-client";


const Chats = () => {
    const socket = socketIoClient(process.env.NEXT_PUBLIC_EXPRESS_URL_DIRECT as string);
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        ref.current?.scrollTo(0, ref.current?.scrollHeight);
    }, []);

    socket.on("connect", () => {
        console.log("connected");
    });

    const sendMessage = () => {
        socket.emit("message",
            {
                message: "Hello, how are you doing?",
                sender: "sender",
            }
        );
    }

    return (
        <div className="relative chat_height">
            <div className="flex items-center border-b py-6 px-5 pb-6">
                <div className="mr-6 sm:mr-10">
                    <Link href="/mix/messages">
                        <LucideArrowLeft size={30} className="cursor-pointer" />
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div><Image className="rounded-full aspect-square object-cover" width={50} height={50} priority src="/images/user.png" alt="" /></div>
                    <div className="">
                        <h1 className="font-bold text-sm md:text-base">
                            <Link href="/mix/profile">Kesha Adams</Link>
                        </h1>
                        <div className="flex gap-1 items-center text-xs md:text-xs">
                            <span className="block text-center align-middle w-3 h-3 bg-green-400 rounded-full"></span>
                            <p>Online</p>
                        </div>
                    </div>
                </div>
                <div className="ml-auto">
                    <LucideGrip size={30} className="cursor-pointer" />
                </div>
            </div>
            <div className="max-h-[80vh] overflow-auto pb-3" ref={ref}>
                <div className="p-4">
                    <MessageBubble
                        sender="receiver"
                        message="am doing great, thanks for asking."
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="sender"
                        message="Hello, how are you doing?"
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="receiver"
                        message="Hello, how are you doing?"
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="sender"
                        message="I'm doing great, thanks for asking."
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="receiver"
                        message="am doing great, thanks for asking."
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="sender"
                        message="Hello, how are you doing?"
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="receiver"
                        message="Hello, how are you doing?"
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="sender"
                        message="I'm doing great, thanks for asking."
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="receiver"
                        message="am doing great, thanks for asking."
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="sender"
                        message="Hello, how are you doing?"
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="receiver"
                        message="Hello, how are you doing?"
                    />
                </div>
                <div className="p-4">
                    <MessageBubble
                        sender="sender"
                        message="I'm doing great, thanks for asking."
                    />
                </div>
            </div>

            <div className="fixed bottom-0 z-30 lg:w-[43.7%] w-full bg-white ">
                <button onClick={sendMessage}>Send</button>
                <MessageInput />
            </div>
        </div>

    );
}

export default Chats;