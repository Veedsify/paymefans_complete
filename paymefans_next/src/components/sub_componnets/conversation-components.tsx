"use client"
import { useConversationsContext } from "@/contexts/messages-conversation-context";
import { useUserAuthContext } from "@/lib/userUseContext";
import { Conversation, LastMessage } from "@/types/conversations";
import { LucideLink2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import ActiveProfileTag from "./sub/active-profile-tag";


const ConversationComponent = () => {
    const { conversations } = useConversationsContext();
    return (
        <>
            {conversations.length === null && <ConversationCardLoader />}
            {conversations.length === 0 && <div className="text-center">No conversations yet</div>}
            {conversations
                // .filter(conversation => conversation?.conversation?.Messages?.length > 0)
                .map((conversation) => (
                    <ConversationCard key={conversation?.conversation_id} conversation={conversation} />
                ))}
        </>
    )
}

const ConversationCardLoader = () => {
    return (
        <>
            <div>
                <div className="animate-pulse flex items-center gap-2 md:gap-5 p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 md:w-16 md:h-16 aspect-square bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                            <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                                <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                            </div>
                            <div className="text-sm">
                                <div className="w-36 h-4 bg-gray-300 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="animate-pulse flex items-center gap-2 md:gap-5 p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 md:w-16 md:h-16 aspect-square bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                            <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                                <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                            </div>
                            <div className="text-sm">
                                <div className="w-36 h-4 bg-gray-300 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ConversationCard = ({ conversation }: {
    conversation: {
        conversation: Conversation;
        conversation_id: string;
        lastMessage: LastMessage,
        receiver: {
            user_id: string;
            username: string;
            name: string;
            profile_image: string;
        }
    }
}) => {
    const router = useRouter()
    const { user } = useUserAuthContext()

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).tagName === "A") return;
        router.push(`/chats/${conversation?.conversation_id}`)
    }

    return (
        <>
            <div
                onClick={handleClick}
                className={`block ${!conversation?.lastMessage?.seen && conversation?.lastMessage?.sender_id !== user?.user_id ? "bg-messages-unread" : ""} mb-3 rounded cursor-pointer`} data-link="/chats/1" >
                <div className="flex items-center gap-2 md:gap-5 p-3">
                    <Link
                        onClick={(e) => e.stopPropagation()}
                        className="relative"
                        href={`/${conversation?.receiver?.username}`}>
                        <Image width={65} height={65} src={conversation?.receiver?.profile_image} alt="user messages" className="object-cover rounded-full w-12  md:w-16 aspect-square" />
                        <div className="absolute right-0 scale-110 bg-white p-1 rounded-full bottom-1">
                            <ActiveProfileTag scale={1.2} userid={conversation?.receiver?.user_id} />
                        </div>
                    </Link>
                    <div className="flex-1">
                        <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                            <Link onClick={(e) => e.stopPropagation()} href={`/${conversation?.receiver?.username}`}><h1 className="font-bold">{conversation?.receiver?.name}</h1></Link>
                            <Link onClick={(e) => e.stopPropagation()} href={`/${conversation?.receiver?.username}`}>
                                <p className="hidden md:block">{conversation?.receiver?.username}</p>
                            </Link>
                            <div className="flex items-center gap-2 ml-auto">
                                <p className="hidden md:block">
                                    {conversation?.lastMessage?.created_at ? new Date(conversation?.lastMessage?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                </p>
                                {!conversation?.lastMessage?.seen ? <span className={`text-white w-2 h-2  ${!conversation?.lastMessage?.seen && conversation?.lastMessage?.sender_id !== user?.user_id ? " bg-primary-dark-pink" : ""} rounded-2xl block`}></span> : ""}
                            </div>
                        </div>
                        <div className="text-sm">
                            <Link href={`/chats/${conversation?.conversation_id}`}>
                                {conversation?.lastMessage?.created_at ? (
                                    <div>
                                        <div className="text-xs md:text-sm"
                                            dangerouslySetInnerHTML={{ __html: String(conversation?.lastMessage?.message).substring(0, 100) + (conversation?.lastMessage?.message?.length > 100 ? "..." : "") }}
                                        >
                                        </div>
                                        <>
                                            {conversation?.lastMessage?.attachment?.length > 0 && <div className="flex gap-1">
                                                {conversation?.lastMessage?.attachment.map((file, index) => {
                                                    if (index > 5) return
                                                    return <LucideLink2 className="text-gray-500" key={index} />
                                                })}
                                            </div>}
                                        </>
                                    </div>) : "New Conversation"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ConversationComponent;