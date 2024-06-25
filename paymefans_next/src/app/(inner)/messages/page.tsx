import ConversationComponent from "@/components/sub_componnets/conversation-components";
import MessageCounter from "@/components/sub_componnets/message-counter";
import { LucideSearch } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Messages",
    description: "Profile page",
}

const Messages = async () => {
    return (
        <div className="md:py-5 md:px-8 p-3">
            <MessageCounter />
            <div className="flex align-baseline justify-between border border-gray-400 rounded-md p-4 mb-7 w-full">
                <input type="text" placeholder="Search Messages" className=" text-sm outline-none border-none" />
                <LucideSearch className="block text-center" />
            </div>
            <ConversationComponent />
        </div>
    );
}

export default Messages;