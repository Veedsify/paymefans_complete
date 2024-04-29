"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import { createNewConversation } from "@/utils/data/create-conversation";
import { LucideMail } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateConversationButton({ profileId }: { profileId: string }) {
    const router = useRouter();
    const { user } = useUserAuthContext();
    const createConversation = async () => {
        createNewConversation({ userId: user.user_id, profileId }).then((res) => {
            if (res?.status === 200 && res.data.status === true) {
                router.push(`/mix/chats/${res.data.conversation_id}`)
            } else {
                toast.error("sorry you cant message this user at the moment")
            }
        }).catch((err) => {
            console.log(err);
        })
    };
    return (
        <button
            onClick={createConversation}
            className="p-1 text-white rounded bg-primary-dark-pink">
            <LucideMail className="w-5 h-5" />
        </button>
    );
}