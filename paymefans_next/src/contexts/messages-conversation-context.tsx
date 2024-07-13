"use client"
import { socket } from "@/components/sub_componnets/sub/socket";
import { useUserAuthContext } from "@/lib/userUseContext";
import { MessagesConversationContextValue, UserConversations } from "@/types/components";
import { Conversation, LastMessage } from "@/types/conversations";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";




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
        const joinData = () => {
            return
        }

        socket.emit("user-connected", {
            userId: user?.user_id
        });

        socket.on("conversations", (data) => {
            setData(data.conversations)
        })
        return () => {
            socket.off("conversations");
        }
    }, [user]);

    const countUnreadMessages = data?.filter((item: UserConversations) => {
        return !item.lastMessage.seen && item.lastMessage.sender_id !== user?.user_id;
    }) || [];

    const value: MessagesConversationContextValue = {
        conversations: data || [],
        lastMessage: data[data.length - 1]?.lastMessage,
        count: countUnreadMessages.length
    };

    return (
        <MessagesConversationContext.Provider value={value}>
            {children}
        </MessagesConversationContext.Provider>
    );
};
