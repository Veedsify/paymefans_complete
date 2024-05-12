"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { Conversation, LastMessage, Message } from "@/types/conversations";
import axiosInstance from "@/utils/axios";
import { getToken } from "@/utils/cookie.get";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
const socket = socketIoClient(
    process.env.NEXT_PUBLIC_EXPRESS_URL_DIRECT as string
);

interface UserConversations {
    conversation: Conversation;
    conversation_id: string;
    lastMessage: LastMessage
}

export interface MessagesConversationContextValue {
    count?: number;
    conversations: UserConversations[];
    addConversations?: (conversations: Conversation) => void;
}

const MessagesConversationContext = createContext<MessagesConversationContextValue | null>(
    null
);

export const useConversationsContext = () => {
    const context = useContext(MessagesConversationContext);
    if (!context) {
        throw new Error("useMessagesContext must be used within a MessagesConversationProvider");
    }
    return context;
};

export const MessagesConversationProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState([] as UserConversations[]);
    const { user } = useUserAuthContext()
    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/conversations/my-conversations`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    }
                });

                if (res.data.status === true && res.status === 200) {
                    setData(res.data.conversations)
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();

    }, []);

    const countUnreadMessages = data?.filter((item: UserConversations) => {
        return !item.lastMessage.seen && item.lastMessage.sender_id !== user.user_id;
    }) || [];

    const value: MessagesConversationContextValue = {
        conversations: data || [],
        count: countUnreadMessages.length
    };

    return (
        <MessagesConversationContext.Provider value={value}>
            {children}
        </MessagesConversationContext.Provider>
    );
};

const fetchMessages = async () => {
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/conversations/my-conversations`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        });

        if (res.data.status === true && res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};


