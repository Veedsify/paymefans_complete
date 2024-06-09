"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import PostComponent from "../route_component/post_component";
import LoadingPost from "./loading_post";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserPosts } from "@/utils/data/get-user-post";
import { formatDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";

type UserPostProps = {
    content: string;
    post_id: string;
    post_audience: string;
    post_likes: number;
    post_comments: number;
    post_shares: number;
    post_reposts: number;
    media: {
        type: string;
        poster?: string | null
        url: string;
    }[];
    created_at: Date;
}

const PostPanel = () => {
    const { user } = useUserAuthContext()

    const { data, isLoading, error, isFetched } = useQuery({
        queryKey: ["user-posts", { pageParam: 1 }],
        queryFn: async () => await getUserPosts({ pageParam: 1 }),
    })

    if (error) console.error(error)

    return (
        <div className="py-6 mt-3 mb-12 select-none"
        >
            {(user && isFetched) && data.data.map((post: UserPostProps, index: number) => (
                <PostComponent key={index}
                    user={{ id: user.id, name: user.name, link: `/profile/${user.username}`, username: user.username, image: user.profile_image }}
                    data={{
                        ...post,
                        post: post.content,
                        media: post.media,
                        time: formatDate(new Date(post.created_at))
                    }}
                />
            ))}
            {isLoading && <LoadingPost />}

            {/* <div className="py-6">
                <button
                    className="block mx-auto mt-6 px-4 py-2 bg-primary-dark-pink text-white rounded-md disabled:bg-gray-300"
                    disabled={loading || posts.length === 0}
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
            </div> */}
        </div>
    );
}

export default PostPanel;