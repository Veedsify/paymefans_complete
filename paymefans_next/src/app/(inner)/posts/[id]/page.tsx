"use client"
import CommentsHolder from "@/components/route_component/comments";
import { PostCompInteractions } from "@/components/route_component/post-interactions";
import ReplyPostComponent from "@/components/route_component/reply-post-textarea";
import { PostPageImage } from "@/components/sub_componnets/postpage-image";
import QuickPostActions from "@/components/sub_componnets/quick_post_actions";
import { getToken } from "@/utils/cookie.get";
import { formatDate } from "@/utils/format-date";
import axios from "axios";
import { LucideEye, LucideLock, LucideUsers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";

interface PostPageprops {
    params: {
        id: string;
    }
}
async function getPost(id: string) {
    const token = getToken()
    const secure_id = encodeURIComponent(id)
    const getpost = await axios.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/posts/${secure_id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    return getpost.data
}

const Post = ({ params: { id } }: PostPageprops) => {
    const [post, setPost] = useState<any>(null)
    const router = useRouter();
    const [formattedText, setFormattedText] = useState<string>('')
    useEffect(() => {
        const fetchPost = async (id: string) => {
            try {
                const post = (await getPost(id))
                setPost(post.data)
            } catch (error) {
                toast.error("Post not found")
                router.push("/")
            }
        }
        fetchPost(id)
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
                        <Link href={`/${[post?.user.username]}`} className="flex items-center gap-1">
                            <p className="text-black font-bold">{post?.user.name}</p>{post?.user.username}
                        </Link>
                        <small className="ml-auto">
                            {formatDate(new Date(post?.created_at))}
                        </small>
                        <div className="text-black">
                            {post?.post_audience === "public" ? <LucideEye size={15} /> : post?.post_audience === "private" ? <LucideLock size={15} /> : <LucideUsers size={15} />}
                        </div>
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
                <div className={`grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`}>
                    {post?.UserMedia.map((media: any, index: number) => (
                        <PostPageImage key={index} media={media} />
                    ))}
                </div>
                <PostCompInteractions data={post} />
                <ReplyPostComponent options={{
                    post_id: post?.post_id,
                    post_audience: post?.post_audience,
                    author_username: post?.user.username
                }} />
                <div>
                    {post && <CommentsHolder post={post} />}
                </div>
            </div>
        </div >
    );
}

export default Post;
