"use client";
import { useUserPointsContext } from "@/contexts/user-points-context";
import { useUserAuthContext } from "@/lib/userUseContext";
import { GetUserPointBalance } from "@/utils/data/get-user-point-balance";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { LucidePlus, LucideCamera, LucideSendHorizonal } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import swal from "sweetalert";

export interface Message {
  message_id: number;
  message: string;
  sender_id: string;
  receiver_id?: string;
  attachment?: {
    type: string;
    poster: string;
    url: string;
  } | null;
  seen: boolean;
  conversationId?: string;
  created_at: string;
}
export interface MessageInputProps {
  sendMessage: ({ }: Message) => void;
  sendTyping?: (typing: boolean) => void;
  receiver: any;
}

const MessageInput = ({
  sendMessage,
  sendTyping,
  receiver,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { user } = useUserAuthContext();
  const ref = useRef<HTMLDivElement>(null);
  const { points } = useUserPointsContext()

  const sendNewMessage = () => {
    if (user) {
      console.log(points, typeof points)
      if (points < Number(receiver?.Settings?.price_per_message)) {
        setMessage("");
        if (ref.current) {
          ref.current.innerHTML = "";
          ref.current.focus();
        }

        return swal({
          icon: "error",
          title: "Oops!",
          text: `Sorry, You need to have at least ${receiver?.Settings?.price_per_message} points to send a message to ${receiver?.name}`,
        });
      }
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage || trimmedMessage.length === 0) return;
    const id = Math.floor(Math.random() * (100000 - 1 + 1) + 1) + Date.now();
    sendMessage({
      message_id: id,
      message: trimmedMessage,
      sender_id: user?.user_id as string,
      seen: false,
      created_at: new Date().toString(),
    });
    setMessage("");
    if (ref.current) {
      ref.current.innerHTML = "";
      ref.current.focus();
    }
  };

  const handleSendMessage = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      sendNewMessage();
      return;
    }
    if (e.key === "Enter") {
      return;
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("input", (e: Event) => {
        const target = e.target as HTMLDivElement;
        setMessage(target.innerHTML);
      });
    }

    document.addEventListener("paste", (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain");
      document.execCommand("insertText", false, text);
    });

    return () => {
      document
        .querySelector("#message-input")
        ?.removeEventListener("input", (e: Event) => {
          const target = e.target as HTMLDivElement;
          setMessage(target.innerHTML);
        });

      document.removeEventListener("paste", (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData("text/plain");
        document.execCommand("insertText", false, text);
      });
    };
  }, []);

  return (
    <div
      className="position-fixed bottom-0 
        lg:mx-4"
    >
      <div className="flex mb-2 items-center gap-5 px-6 bg-gray-100 lg:py-2 py-4 lg:rounded-xl">
        <div
          ref={ref as RefObject<HTMLDivElement>}
          contentEditable={true}
          id="message-input"
          onKeyDown={handleSendMessage}
          className="bg-transparent outline-none w-full p-2 font-semibold resize-none"
        ></div>

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
};

export default MessageInput;
