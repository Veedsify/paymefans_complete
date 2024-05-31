"use client"
import { useUserAuthContext } from "@/lib/userUseContext";
import PostComponent from "../route_component/post_component";
import LoadingPost from "./loading_post";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserPosts } from "@/utils/data/get-user-post";

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

const PostPanelOther = () => {
    const { user } = useUserAuthContext()
    const [posts, setPosts] = useState<UserPostProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Simulating fetching posts from an API
        const fetchPosts = async () => {
            setLoading(true);
            const { data } = await getUserPosts(page)
            setPosts(prevPosts => {
                const filteredPosts = prevPosts.filter(prevPost => {
                    // Check if any post in data has the same post_id as the current prevPost
                    return !data.some((newPost: UserPostProps) => newPost.post_id === prevPost.post_id);
                });
                return [...filteredPosts, ...data];
            });

            setLoading(false);
        };
        fetchPosts();
    }, [page, setPosts, setLoading]);


    const handleScroll = useCallback((): void => {
        const { innerHeight, pageYOffset } = window;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        if (Math.round(innerHeight + pageYOffset) !== scrollHeight) {
            return;
        }

        setPage((prevPage: number) => prevPage + 1);
    }, [setPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="py-6 mt-3 mb-12 select-none"
        >
            {user && posts.map((post, index) => (
                <PostComponent key={index}
                    user={{ name: user.name, link: `/mix/profile/${user.username}`, username: user.username, image: user.profile_image }}
                    data={{
                        ...post,
                        post: "crafting is my passion and I love to make new things everyday. I hope you like my work. #crafting #art #handmade",
                        media: post.media,
                        time: new Date(post.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).replace(',', '')
                    }}
                />
            ))}
            {posts.length === 0 && !loading && <p className="text-center text-gray-500">No posts found</p>}
            {loading && <div className="py-10 mb-7">
                <h1 className="text-xl text-center font-medium">
                    Loading posts...
                </h1>
            </div>}
        </div>
    );
}

export default PostPanelOther;