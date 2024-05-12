"use client"
import { useConversationsContext } from "@/contexts/messages-conversation-context";
import { useUserAuthContext } from "@/lib/userUseContext";
import { Conversation, LastMessage } from "@/types/conversations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";


const ConversationComponent = () => {
    const { conversations } = useConversationsContext();
    return (
        <>
            {
                conversations.map((conversation) => {
                    const messageExist = conversation?.conversation?.Messages?.length > 0;
                    if (!messageExist) {
                        return null
                    } else {
                        return <ConversationCard key={conversation?.conversation_id} conversation={conversation} />
                    }
                })
            }
        </>
    )
}

const ConversationCardLoader = () => {
    return (
        <div>
            <div className="animate-pulse flex items-center gap-2 md:gap-5 p-3">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 aspect-square bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                        <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                            <div className="w-24 h-4 bg-gray-300 rounded-full"></div>
                            <div className="w-16 h-4 bg-gray-300 rounded-full"></div>
                            <div className="w-16 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="text-sm">
                            <div className="w-24 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ConversationCard = ({ conversation }: {
    conversation: {
        conversation: Conversation;
        conversation_id: string;
        lastMessage: LastMessage
    }
}) => {
    const router = useRouter()
    const { user } = useUserAuthContext()

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).tagName === "A") return;
        router.push(`/mix/chats/${conversation?.conversation_id}`)
    }

    return (
        <>
            <div
                onClick={handleClick}
                className={`block ${!conversation?.lastMessage?.seen && conversation?.lastMessage?.sender_id !== user?.user_id ? "bg-messages-unread" : ""} mb-3 rounded cursor-pointer`} data-link="/mix/chats/1" >
                <div className="flex items-center gap-2 md:gap-5 p-3">
                    <Link
                        onClick={(e) => e.stopPropagation()}
                        href={`/mix/profile/${conversation?.conversation?.username}`}>
                        <Image width={65} height={65} src={conversation?.conversation?.profile_image} alt="user messages" className="object-cover rounded-full w-12  md:w-16 aspect-square" />
                    </Link>
                    <div className="flex-1">
                        <div className="flex flex-1 text-sm gap-4 mb-2 w-full">
                            <Link onClick={(e) => e.stopPropagation()} href={`/mix/profile/${conversation?.conversation?.username}`}><h1 className="font-bold">{conversation?.conversation?.name}</h1></Link>
                            <Link onClick={(e) => e.stopPropagation()} href={`/mix/profile/${conversation?.conversation?.username}`}>
                                <p className="hidden md:block">{conversation?.conversation?.username}</p>
                            </Link>
                            <div className="flex items-center gap-2 ml-auto">
                                <p className="hidden md:block">
                                    {new Date(conversation?.lastMessage?.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                                {!conversation?.lastMessage?.seen ? <span className="text-white w-2 h-2 bg-primary-dark-pink rounded-full block"></span> : ""}
                            </div>
                        </div>
                        <div className="text-sm">
                            <Link href={`/mix/chats/${conversation?.conversation_id}`}>
                                <p className="text-xs md:text-sm truncate">
                                    {conversation?.lastMessage?.message}
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ConversationComponent;