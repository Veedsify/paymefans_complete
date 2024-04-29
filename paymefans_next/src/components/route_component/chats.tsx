"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideArrowLeft, LucideGrip } from "lucide-react";
import socketIoClient from "socket.io-client";
import toast from "react-hot-toast";
import MessageBubble from "../sub_componnets/message_bubble";
import MessageInput, { Message } from "../sub_componnets/message_input";
import { useUserAuthContext } from "@/lib/userUseContext";

const socket = socketIoClient(process.env.NEXT_PUBLIC_EXPRESS_URL_DIRECT as string);

const Chats = ({ allmessages, conversationId, receiver }: { allmessages: Message[], conversationId: string, receiver?: any }) => {
  const [messages, setMessages] = useState(allmessages);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUserAuthContext()

  useEffect(() => {
    const handleMessage = (message: Message) => {
      if (message) {
        setMessages((prev) => [...prev, { id: message.id, seen: false, message: message.message, sender: message.sender, date: new Date() }]);
      }
    };
    const handleSeen = (id: number) => {
      console.log("seen id", id)
      setMessages((prev) => {
        return prev.map((message) => {
          if (message.id === id) {
            return { ...message, seen: true };
          }
          return message;
        });
      });
    }

    socket.emit("join", conversationId);
    socket.on("message", handleMessage);
    socket.on("seen", handleSeen);
    socket.on("joined", handleJoined);
    return () => {
      socket.off("message", handleMessage);
      socket.off("seen", handleSeen);
      socket.off("joined", handleJoined);
    };
  }, [conversationId, setMessages]);

  useLayoutEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const MessageBubble = document.querySelectorAll(".message-bubbles");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const lastMessage = messages[messages.length - 1];
        if (entry.isIntersecting && !lastMessage.seen) {
          const id = Number(entry.target.getAttribute("data-id"));
          socket.emit("seen", id);
          observer.unobserve(entry.target);
        }
      });
    });

    MessageBubble.forEach((message) => {
      observer.observe(message);
    });

    return () => {
      observer.disconnect();
    };
  }, [messages, user]);

  const handleJoined = (message: { message: string }) => {
    // toast.success(message.message);
  };

  const sendMessage = ({ id, message, sender, attachment }: Message) => {
    setMessages((prev) => [...prev, { id, message, sender, attachment, seen: false, date: new Date() }]);
    socket.emit("new-message", { id, message, sender, attachment, conversationId, date: new Date() });
  };
  return (
    <div className="relative chat_height">
      <div className="flex items-center border-b py-6 px-5 pb-6">
        <div className="mr-6 sm:mr-10">
          <Link href="/mix/messages">
            <LucideArrowLeft size={30} className="cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Image
              className="rounded-full aspect-square object-cover"
              width={50}
              height={50}
              priority
              src={receiver.profile_image ? receiver.profile_image : "/images/default_profile_image.png"}
              alt=""
            />
          </div>
          <div className="">
            <h1 className="font-bold text-sm md:text-base">
              <Link href="/mix/profile">{receiver.name}</Link>
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
          <div key={index} data-id={message.id} className="p-4 message-bubbles" ref={index === messages.length - 1 ? ref : null}>
            <MessageBubble seen={message.seen} sender={message.sender} date={message.date} message={message.message} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 z-30 lg:w-[43.7%] w-full bg-white ">
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chats;
