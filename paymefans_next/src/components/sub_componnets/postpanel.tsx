"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import PostComponent from "../route_component/post_component";
import LoadingPost from "./loading_post";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserPosts } from "@/utils/data/get-user-post";
import { formatDate } from "@/utils/format-date";

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
    const [posts, setPosts] = useState<UserPostProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let isCancelled = false;
        const fetchPosts = async () => {
            setLoading(true);
            const res = await getUserPosts({ pageParam: page })
            if (!isCancelled && res && res.data) {
                const myposts = [...res.data]
                setPosts(prevPosts => {
                    return [...prevPosts, ...myposts.flat()]
                });
            }
            if (!isCancelled) {
                setLoading(false);
            }
        };
        fetchPosts();

        return () => {
            isCancelled = true;
        };
    }, [page]);


    const handleClickToFetch = useCallback((): void => {
        if (posts.length === 0) return;
        setPage((prevPage: number) => prevPage + 1);
    }, [setPage]);

    return (
        <div className="py-6 mt-3 mb-12 select-none"
        >
            {user && posts.map((post, index) => (
                <PostComponent key={index}
                    user={{ name: user.name, link: `/profile/${user.username}`, username: user.username, image: user.profile_image }}
                    data={{
                        ...post,
                        post: post.content,
                        media: post.media,
                        time: formatDate(new Date(post.created_at))
                    }}
                />
            ))}
            {posts.length === 0 && !loading && <p className="text-center text-gray-500">No posts found</p>}

            {loading && <LoadingPost />}

            <div className="py-6">
                <button
                    onClick={handleClickToFetch}
                    className="block mx-auto mt-6 px-4 py-2 bg-primary-dark-pink text-white rounded-md disabled:bg-gray-300"
                    disabled={loading || posts.length === 0}
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
            </div>
        </div>
    );
}

export default PostPanel;