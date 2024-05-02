"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideArrowLeft, LucideGrip } from "lucide-react";
import socketIoClient from "socket.io-client";
import toast from "react-hot-toast";
import MessageBubble from "../sub_componnets/message_bubble";
import MessageInput, { Message } from "../sub_componnets/message_input";
import { useUserAuthContext } from "@/lib/userUseContext";
const socket = socketIoClient(
  process.env.NEXT_PUBLIC_EXPRESS_URL_DIRECT as string
);

const Chats = ({
  allmessages,
  conversationId,
  receiver,
}: {
  allmessages: Message[];
  conversationId: string;
  receiver?: any;
}) => {
  const [messages, setMessages] = useState(allmessages);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUserAuthContext();

  const handleJoined = (message: { message: string }) => {
    // toast.success(message.message);
  };

  const sendMessageToReceiver = ({
    message_id,
    message,
    sender_id,
    attachment,
  }: Message) => {
    setMessages((prev) => [
      ...prev,
      {
        message_id,
        message,
        sender_id,
        attachment,
        seen: false,
        created_at: new Date().toString(),
      },
    ]);
    socket.emit("new-message", {
      message_id,
      message,
      sender_id,
      attachment,
      conversationId,
      date: new Date().toString(),
    });
  };

  const sendTyping = (typing: boolean) => {
    socket.emit("typing", typing);
  };

  // USE STATES
  useEffect(() => {
    const handleMessageReceived = (message: Message) => {
      if (message) {
        setMessages((prev) => [
          ...prev,
          {
            message_id: message.message_id,
            seen: false,
            message: message.message,
            sender_id: message.sender_id,
            created_at: new Date().toString(),
          },
        ]);
      }
    };
    const handleSeen = (id: number) => {
      const time = new Date().toLocaleTimeString();

      setMessages((prev) => {
        return prev.map((message) => {
          if (message.message_id == id) {
            return { ...message, seen: true };
          }
          return message;
        });
      });
    };
    const handleTyping = ({ typing }: { typing: boolean }) => {
      setTyping(typing);
    };

    socket.emit("join", conversationId);
    socket.on("message", handleMessageReceived);
    socket.on("typing", handleTyping);
    socket.on("joined", handleJoined);
    return () => {
      socket.off("message", handleMessageReceived);
      socket.off("typing", handleTyping);
      socket.off("joined", handleJoined);
    };
  }, [conversationId, setMessages, typing]);

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
              src={
                receiver.profile_image
                  ? receiver.profile_image
                  : "/images/default_profile_image.png"
              }
              alt=""
            />
          </div>
          <div className="">
            <div className="font-bold text-sm md:text-base">
              <Link
                href="/mix/profile"
                className="flex gap-3 duration-300 items-center"
              >
                <span>{receiver.name}</span>
                <span className="text-xs fw-bold text-primary-dark-pink inline-block">
                  {typing && "typing..."}
                </span>
              </Link>
            </div>
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
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            data-id={message.message_id}
            className="p-4 message-bubbles"
            ref={index === messages.length - 1 ? ref : null}
          >
            <MessageBubble
              seen={message.seen}
              sender={message.sender_id}
              date={message.created_at}
              message={message.message}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 z-30 lg:w-[43.7%] w-full bg-white ">
        <MessageInput
          receiver={receiver}
          sendMessage={sendMessageToReceiver}
          sendTyping={sendTyping}
        />
      </div>
    </div>
  );
};

export default Chats;
