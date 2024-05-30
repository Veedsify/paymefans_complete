"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideArrowLeft, LucideGrip } from "lucide-react";
import MessageBubble from "../sub_componnets/message_bubble";
import MessageInput, { Message } from "../sub_componnets/message_input";
import { useUserAuthContext } from "@/lib/userUseContext";
import { socket } from "../sub_componnets/sub/socket";

const Chats = ({
  allmessages,
  lastMessage,
  conversationId,
  receiver,
}: {
  allmessages: Message[];
  lastMessage: Message | undefined | null;
  conversationId: string;
  receiver?: any;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUserAuthContext();
  const heightRef = useRef<HTMLDivElement>(null);

  const handleJoined = useCallback((message: { message: string }) => {
    // toast.success(message.message);
  }, []);

  useEffect(() => {
    setMessages(allmessages);
  }, [allmessages]);

  const sendMessageToReceiver = useCallback(
    ({ message_id, message, sender_id, attachment }: Message) => {
      const newMessage = {
        id: messages.length + 1,
        message_id,
        message,
        sender_id,
        attachment,
        seen: false,
        created_at: new Date().toISOString(), // Using ISO format for consistency
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("new-message", {
        ...newMessage,
        receiver_id: receiver.user_id,
        conversationId,
        date: newMessage.created_at,
      });
    },
    [setMessages, receiver, conversationId, messages]
  );

  useEffect(() => {
    const handleMessageReceived = (message: Message) => {
      if (message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message_id: message.message_id,
            seen: false,
            attachment: message.attachment,
            message: message.message,
            sender_id: message.sender_id,
            created_at: new Date().toISOString(),
          },
        ]);

        if (message.sender_id !== user?.user_id) {
          socket.emit("message-seen", {
            conversationId,
            lastMessageId: message.message_id,
          });
        }
      }
    };

    const handleSeenByReceiver = (data: any) => {
      if (data.messageId) {
        setMessages((prevMessages) =>
          prevMessages && prevMessages.map((message) => {
            if (message.seen !== true) {
              return {
                ...message,
                seen: true,
              }
            } else {
              return message;
            }
          })
        );
      }
    };

    socket.emit("join", conversationId);
    socket.on("joined", handleJoined);
    socket.on("message", handleMessageReceived);
    socket.on("message-seen-updated", handleSeenByReceiver);
    socket.on("sender-typing", (data: any) => {
      if (data.sender_id === user?.user_id) return;
      setTyping(data.value);
    });
    return () => {
      socket.off("message", handleMessageReceived);
      socket.off("joined", handleJoined);
      socket.off("sender-typing");
      socket.off("message-seen-updated", handleSeenByReceiver);
    };
  }, [conversationId, setMessages, messages, user, handleJoined]);

  const sendTyping = (value: boolean) => {
    socket.emit("typing", {
      sender_id: user?.user_id,
      value,
      conversationId,
    });
  };
  useEffect(() => {

    const height_ref = heightRef.current;
    if (height_ref) {
      height_ref.scrollTop = height_ref.scrollHeight;
    }

    return () => {
      if (height_ref) {
        height_ref.scrollBy(0, height_ref.scrollHeight);
      }
    }
  }, [heightRef, messages]);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
    const handleSeen = () => {
      if (lastMessage && lastMessage.sender_id !== user?.user_id) {
        socket.emit("message-seen", {
          conversationId,
          lastMessageId: lastMessage.message_id,
        });
      }
    };
    handleSeen();
  }, [lastMessage, user, conversationId]);

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
                  : "/site/avatar.png"
              }
              alt=""
            />
          </div>
          <div className="">
            <div className="font-bold text-sm md:text-base">
              <Link
                href={`/mix/profile/${receiver.username}`}
                className="flex gap-3 duration-300 items-center"
              >
                <span>{receiver ? receiver.name : ""}</span>
                <span className="text-xs fw-bold text-primary-dark-pink inline-block">
                  {typing ? "typing..." : ""}
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
      <div className="max-h-[80vh] overflow-auto pb-5" ref={heightRef}>
        {messages?.map((message: Message, index: number) => (
          <div
            key={index}
            data-id={message.message_id}
            className="p-4 message-bubbles"
            ref={index === messages.length - 1 ? ref : null}
          >
            <MessageBubble
              seen={message.seen}
              attachment={message.attachment}
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
