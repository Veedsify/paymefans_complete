"use client"
import MessageBubble from "@/components/sub_componnets/message_bubble";
import MessageInput, { Message } from "@/components/sub_componnets/message_input";
import { LucideArrowLeft, LucideGrip } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import socketIoClient from "socket.io-client";


const Chats = () => {

    const socket = socketIoClient(process.env.NEXT_PUBLIC_EXPRESS_URL_DIRECT as string);
    const [messages, setMessages] = React.useState([
        { message: "Hello", sender: "sender" },
        { message: "Good Morning Ma", sender: "sender" },
    ] as Message[]);

    const ref = React.useRef<HTMLDivElement>(null);
    const lastNodeRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        document.title = "Chats";
        ref.current?.scrollTo(0, ref.current?.scrollHeight);
    }, []);

    React.useEffect(() => {
        if (lastNodeRef.current) {
            lastNodeRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, lastNodeRef]);

    const sendMessage = ({ message, sender, attachment }: Message) => {
        setMessages([...messages, { message, sender, attachment }]);
    }

    // socket.emit("message", { message, sender, attachment });
    // socket.on("connect", () => {
    //     console.log("connected");
    // });

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
                {messages.map((message: any, index: number) => (
                    <div key={index} className="p-4" ref={lastNodeRef}>
                        <MessageBubble
                            sender={message.sender}
                            message={message.message}
                        />
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 z-30 lg:w-[43.7%] w-full bg-white ">
                <MessageInput sendMessage={sendMessage} />
            </div>
        </div>

    );
}

export default Chats;