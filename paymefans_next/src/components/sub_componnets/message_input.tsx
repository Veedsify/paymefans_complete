"use client";
import { useUserPointsContext } from "@/contexts/user-points-context";
import { useUserAuthContext } from "@/lib/userUseContext";
import { LucidePlus, LucideCamera, LucideSendHorizonal } from "lucide-react";
import {
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import UploadMediaComponent from "../route_component/upload-media-conponent";
import swal from "sweetalert";
import { useConversationsContext } from "@/contexts/messages-conversation-context";
import { Attachment, MessageInputProps } from "@/types/components";



const MessageInput = ({
  sendMessage,
  sendTyping,
  receiver,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [attachmentModal, setAttachmentModal] = useState(false);
  const { user } = useUserAuthContext();
  const ref = useRef<HTMLDivElement>(null);
  const { points } = useUserPointsContext()
  const openAttachmentModal = () => setAttachmentModal(!attachmentModal)
  const closeAttachmentModal = () => setAttachmentModal(false)
  const { lastMessage } = useConversationsContext()
  const insertNewMessageFromPreview = (message: string) => {
    setMessage(message)
  }

  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<number | null>(null);

  const handleKeyDown = useCallback(() => {
    if (message.length > 0) {
      setIsTyping(true);
      sendTyping(message);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = window.setTimeout(() => {
      setIsTyping(false);
      sendTyping("");
    }, 1000); // Adjust the timeout duration as needed
  }, [isTyping, sendTyping, message.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [isTyping, handleKeyDown]);

  const sendNewMessage = (attachment: Attachment[]) => {
    if (!user) return;

    const pricePerMessage = Number(receiver?.Settings?.price_per_message);
    const receiverName = receiver?.name ? (receiver.name.charAt(0).toUpperCase() + receiver.name.slice(1)) : '';

    if (points < pricePerMessage) {
      resetMessageInput();
      return swal({
        icon: "info",
        title: "Insufficient Paypoints",
        text: `Sorry, you need to have at least ${pricePerMessage.toLocaleString()} paypoints to send a message to ${receiverName}`
      });
    }

    if (!lastMessage && pricePerMessage !== 0) {
      resetMessageInput();
      return swal({
        icon: "info",
        title: "Notice from PayMeFans",
        text: `Take note sending a message to ${receiverName} would cost you ${pricePerMessage.toLocaleString()} paypoints`
      }).then((isToSend) => {
        if (isToSend) {
          sendMessageWithAttachment(message, attachment);
        }
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0 && attachment.length === 0) return;

    sendMessageWithAttachment(trimmedMessage, attachment);
    resetMessageInput();
  };

  const resetMessageInput = () => {
    setMessage("");
    if (ref.current) {
      ref.current.innerHTML = "";
      ref.current.focus();
    }
  };

  const sendMessageWithAttachment = (message: string, attachment: Attachment[]) => {
    const id = Math.floor(Math.random() * 100000 + 1) + Date.now();
    sendMessage({
      message_id: id,
      message: message,
      attachment: attachment,
      sender_id: user?.user_id as string,
      seen: false,
      created_at: new Date().toString(),
    });
  };

  const handleSendMessage = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      sendNewMessage([])
      setIsTyping(false);
      sendTyping("");
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
    <>
      <div
        className="bottom-0 
        lg:ml-4 lg:mr-2 "
      >
        <div className="flex mb-2 items-center gap-5 px-6 bg-gray-100 lg:py-2 py-4 lg:rounded-xl">
          <div
            ref={ref as RefObject<HTMLDivElement>}
            contentEditable={true}
            id="message-input"
            onKeyDown={handleSendMessage}
            className="bg-transparent outline-none w-full p-2 font-semibold resize-none"
          ></div>
          <span className="cursor-pointer" onClick={openAttachmentModal}>
            <LucidePlus fill="#fff" stroke="#CC0DF8" size={25} />
          </span>
          <span className="cursor-pointer">
            <LucideCamera fill="#fff" stroke="#CC0DF8" size={25} />
          </span>
          <span className="cursor-pointer" onClick={() => sendNewMessage([])}>
            <LucideSendHorizonal fill="#fff" stroke="#CC0DF8" size={25} />
          </span>
        </div>
      </div>
      <UploadMediaComponent
        sendNewMessage={sendNewMessage}
        open={attachmentModal}
        close={closeAttachmentModal}
        setMessage={insertNewMessageFromPreview}
        message={message}
      />
    </>
  );
};

export default MessageInput;
