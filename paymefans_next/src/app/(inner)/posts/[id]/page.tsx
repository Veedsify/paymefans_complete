"use client"
import { PostPageImage } from "@/components/sub_componnets/postpage-image";
import QuickPostActions from "@/components/sub_componnets/quick_post_actions";
import { getToken } from "@/utils/cookie.get";
import { formatDate } from "@/utils/format-date";
import axios from "axios";
import { LucideHeart, LucideMessageSquare, LucideRepeat2, LucideShare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostPageprops {
    params: {
        id: string;
    }
}
async function getPost(id: string) {
    try {
        const token = getToken()
        const secure_id = encodeURIComponent(id)
        const getpost = await axios.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/posts/${secure_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return getpost?.data.data

    } catch (error) {
        console.log(error)
    }
}
const Post = ({ params: { id } }: PostPageprops) => {
    const [post, setPost] = useState<any>(null)
    const router = useRouter();
    const [formattedText, setFormattedText] = useState<string>('')
    useEffect(() => {
        getPost(id).then((data) => {
            setPost(data)
        }).catch((error) => {
            console.log(error.response);

            if (error.response.status === 404) {
                router.push("/404")
            }
        })
    }, [id, router])

    useEffect(() => {
        if (post) {
            setFormattedText(post?.content.replace(/(?:\r\n|\r|\n)/g, '<br>'))
        }
    }, [post])

    return (
        <div className="p-4 mt-8">
            <div className="mb-10">
                <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                    <div className="flex items-center gap-3">
                        <Image width={40} height={40} src={post ? post.user.profile_image : "/site/avatar.png"} alt="" className="w-8 md:w-10 rounded-full aspect-square object-cover" />
                        <Link href={`/profile/${[post?.user.username]}`} className="flex items-center gap-1">
                            <p className="text-black font-bold">{post?.user.name}</p>{post?.user.username}
                        </Link>
                        <small className="ml-auto">
                            {formatDate(new Date(post?.created_at))}
                        </small>
                    </div>
                    <QuickPostActions options={{
                        post_id: post?.post_id,
                        username: post?.user.username,
                    }} />
                </div>

                <div className="text-sm font-medium py-2 leading-loose text-gray-700"
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                >
                </div>

                <div className="flex mt-6 justify-around text-sm w-full text-gray-600 py-1 mb-5">
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                        <LucideHeart size={14} />
                        23
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideMessageSquare size={14} />
                        16
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideRepeat2 size={14} />
                        2
                    </span>
                    <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                        <LucideShare size={14} />
                    </span>
                </div>
                <div className={`grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`}>
                    {post?.media.map((media: any, index: number) => (
                        <PostPageImage key={index} media={media} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default Post;
