"use client";
import { useUserAuthContext } from "@/lib/userUseContext";
import PostComponent, { UserMediaProps } from "../route_component/post_component";
import LoadingPost from "./loading_post";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/format-date";
import { fetchItems } from "@/components/sub_componnets/infinite-query";

import InfiniteScroll from "react-infinite-scroll-component";


type UserPostProps = {
    id: number;
    content: string;
    post_id: string;
    post_audience: string;
    post_likes: number;
    post_comments: number;
    post_shares: number;
    post_reposts: number;
    UserMedia: UserMediaProps[];
    created_at: Date;
    PostLike: {
        post_id: string;
        user_id: number;
    }[]
}

const PostPanel = () => {
    const { user } = useUserAuthContext();
    //allPosts will be used to store the news articles

    const [allPosts, setAllPosts] = useState<UserPostProps[]>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchMoreData = async () => {
        const res = await fetchItems({ pageParam: page + 1 });
        setPage(page + 1);
        setAllPosts((prev) => {
            return [...prev, ...res?.data.data]
        });
        setTotalResults(res?.data.total);
    }


    useEffect(() => {
        async function fetchNews() {
            const res = await fetchItems({ pageParam: page });
            setAllPosts(res?.data.data);
            setTotalResults(res?.data.total);
        }
        fetchNews();
    }, [])

    const EndMessage = () => (
        <div className="px-3 py-9 mt-3">
            <p className="text-center font-medium">
                End Of Post
            </p>
        </div>
    )
    return (
        <div className="mt-3 mb-12 select-none">
            <InfiniteScroll
                dataLength={allPosts.length}
                next={fetchMoreData}
                hasMore={allPosts.length < totalResults}
                loader={<LoadingPost />}
                endMessage={<EndMessage />}
            >
                {user && allPosts?.map((post: UserPostProps, index: number) => (
                    <PostComponent
                        key={index}
                        user={{
                            id: user.id,
                            user_id: user.user_id,
                            name: user.name,
                            link: `/${user.username}`,
                            username: user.username,
                            image: user.profile_image
                        }}
                        isSubscriber={true}
                        data={{
                            ...post,
                            post: post.content,
                            media: post.UserMedia,
                            time: formatDate(new Date(post.created_at))
                        }}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
        ;
}

export default PostPanel;
