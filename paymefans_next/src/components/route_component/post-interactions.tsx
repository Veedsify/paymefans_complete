"use client"
import { LucideHeart, LucideMessageSquare, LucideRepeat2, LucideShare } from "lucide-react";
import ReplyPostComponent from "@/components/route_component/reply-post-textarea";
import { PostData } from "./post_component";
import { useEffect, useState } from "react";
import { useUserAuthContext } from "@/lib/userUseContext";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { LikeThisPost } from "@/utils/postinteractions";
import numeral from "numeral";
export interface PostInteractionsProps {
    options: {
        data?: PostData
        post_likes: number;
        post_id: string;
        post_audience: string;
        author_username: string;
    }
}

export const PostInteractionsWithReply = ({
    options
}: PostInteractionsProps) => {
    const { user } = useUserAuthContext()
    const isSubscriber = user?.username === options.author_username ? true : options?.data?.user?.Subscribers.some(sub => sub.subscriber_id === user?.id) ? true : false
    return (
        <>
            <PostCompInteractions data={options.data} canLike={(!isSubscriber && options?.data?.post_audience === "subscribers")} />
            <ReplyPostComponent options={{ ...options }} isSubscriber={isSubscriber} />
        </>
    )
}

export const PostCompInteractions = ({ data, canLike }: { data: PostData | undefined, canLike: boolean }) => {
    const formattedNumber = (number: number) => numeral(number).format('0a').toUpperCase(); // Converts the suffix to uppercase
    const [like, setLike] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);
    const { user } = useUserAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (data?.post_likes) {
            setLikesCount(data?.post_likes);
        }
    }, [data?.post_likes])

    const likePost = async () => {
        if (canLike) {
            swal({
                title: "You need to be a subscriber to like this post",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: {
                        text: "Ok",
                        className: "bg-primary-dark-pink text-white",
                    },
                }
            })
            return;
        };
        setLike(!like);
        setLikesCount(like ? likesCount - 1 : likesCount + 1);
        const res = await LikeThisPost({ data: data! });
        setLike(res);
    }

    useEffect(() => {
        const isLiked = data?.PostLike.some((like) => like.user_id === user?.id);
        setLike(isLiked!);
    }, [user, data])

    return (
        <div className="flex mt-6 justify-around text-sm w-full text-gray-600 py-6 border-b">
            <span className="flex items-center gap-1 text-sm cursor-pointer font-medium"
                onClick={likePost}
            >
                <LucideHeart
                    fill={like ? "#f20" : "none"}
                    strokeWidth={like ? 0 : 2}
                    size={25} />{formattedNumber(likesCount)}
            </span>
            <span className="flex items-center gap-1 text-sm cursor-pointer font-medium">
                <LucideMessageSquare size={25} />{data?.post_comments}
            </span>
            <span className="flex items-center gap-1 text-sm cursor-pointer font-medium">
                <LucideRepeat2 size={25} />{data?.post_reposts}
            </span>
            <span className="flex items-center gap-1 text-sm cursor-pointer font-medium">
                <LucideShare size={25} />
            </span>
        </div>
    )
}