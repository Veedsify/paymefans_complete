"use client"
import Image from "next/image";
import { LucideBarChart, LucideHeart, LucideMessageSquare, LucideRepeat2, LucideShare } from "lucide-react";
import { PostData } from "./post_component";
import ReplyPostComponent from "./reply-post-textarea";
import numeral from "numeral";
import moment from "moment";
import usePostComponent from "@/contexts/post-component-preview";

const CommentsHolder = ({ post }: { post: PostData }) => {
    const { fullScreenPreview } = usePostComponent();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = numeral(date.getDate()).format('00') + "-" +
            numeral(date.getMonth() + 1).format('00') + "-" +
            date.getFullYear() + " " +
            numeral(date.getHours()).format('00') + ":" +
            numeral(date.getMinutes()).format('00');

        const now = moment();
        const diffForHumans = moment(dateString).from(now);

        return diffForHumans
    };

    const previewImage = (media: string) => {
        fullScreenPreview({
            url: media,
            type: "image",
            open: true
        })
    }

    return (
        <div className="border-y p-0 md:p-3 py-5">
            {post.PostComment?.map((comment, index) => (
                <div className="flex gap-1 md:gap-3 items-start relative w-full" key={index}>
                    {(index !== post?.PostComment?.length! - 1) && (<div className="absolute border-r h-full top-0 left-4 md:left-7 -z-10 -translate-1/2">
                    </div>)}
                    <Image src={comment.user.profile_image} width="50" height="50" className="h-auto aspect-square rounded-full w-8 md:w-14" alt="" />
                    <div className="w-full">
                        <h3 className="mb-2">
                            <span className="md:text-lg text-sm font-bold">{comment.user.name}</span>  &nbsp;<span className="md:text-lg text-sm">{comment.user.username}</span>  &nbsp; . &nbsp; <span className="md:text-lg text-xs">{formatDate(comment.created_at)}</span>
                        </h3>
                        <div className="md:text-lg text-sm mb-2">
                            <div className="mb-3"
                                dangerouslySetInnerHTML={{ __html: comment.comment }}
                            >
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {comment.PostCommentAttachments.map((media, index) => (
                                    <Image
                                        onClick={() => previewImage(media.path)}
                                        key={index} src={media.path} width="500" height="500" className="h-auto aspect-square rounded-lg object-cover cursor-pointer" alt="" />
                                ))}
                            </div>
                        </div>
                        <ReplyInteractions />
                    </div>
                </div>
            ))}

        </div>
    )
}

const ReplyInteractions = () => {
    return (
        <div className="flex items-center justify-between p-2 md:p-6 mb-8">
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                <LucideHeart size={18} />
                0
            </span>
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                <LucideMessageSquare size={18} />
                0
            </span>
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                <LucideRepeat2 size={18} />
                0
            </span>
        </div>
    )
}


export default CommentsHolder;