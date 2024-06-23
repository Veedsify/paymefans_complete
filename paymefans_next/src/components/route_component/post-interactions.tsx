import { LucideHeart, LucideMessageSquare, LucideRepeat2, LucideShare } from "lucide-react";
import ReplyPostComponent from "@/components/route_component/reply-post-textarea";

export interface PostInteractionsProps {
    options: {
        post_id: string
        author_username: string
    }
}

const PostInteractions = ({
    options
}: PostInteractionsProps) => {
    return (
        <>
            <div className="flex mt-6 justify-around text-sm w-full text-gray-600 py-1 mb-5 border-y py-6">
                <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                    <LucideHeart size={25} />
                    23
                </span>
                <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                    <LucideMessageSquare size={25} />
                    16
                </span>
                <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                    <LucideRepeat2 size={25} />
                    2
                </span>
                <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                    <LucideShare size={25} />
                </span>
            </div>
            <ReplyPostComponent options={{ ...options }} />
        </>
    )
}

export default PostInteractions