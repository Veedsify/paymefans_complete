"use client";
import { useUserAuthContext } from "@/lib/userUseContext";
import PostComponent from "../route_component/post_component";
import LoadingPost from "./loading_post";
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { formatDate } from "@/utils/format-date";
import { fetchItems } from "@/components/sub_componnets/infinite-query";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPanelFetch from "../custom-hooks/post-panel-fetch";
import { UserPostProps } from "@/types/components";


const PostPanel = () => {
    const { user } = useUserAuthContext();
    //allPosts will be used to store the news articles
    const [page, setPage] = useState(1);

    const [allPosts, setAllPosts] = useState<UserPostProps[]>([]);
    const [totalResults, setTotalResults] = useState(0);

    const fetchMoreData = async () => {
        const res = await fetchItems({ pageParam: page + 1 });
        setPage(page + 1);
        setAllPosts((prev) => {
            return [...prev, ...res?.data.data]
        });
        setTotalResults(res?.data.total);
    }


    const fetchNews = useCallback(async () => {
        const res = await fetchItems({ pageParam: page });
        setAllPosts(res?.data.data);
        setTotalResults(res?.data.total);
    }, [page])

    useEffect(() => {
        fetchNews();
    }, [fetchNews])

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
                            id: user?.id!,
                            user_id: user?.user_id!,
                            name: user?.name!,
                            link: `/${user?.username}`,
                            username: user?.username!,
                            image: user?.profile_image!
                        }}
                        isSubscriber={true}
                        data={{
                            ...post,
                            post: post.content,
                            media: post.UserMedia,
                            time: formatDate(new Date(post.created_at))
                        }}
                    />
                ))
                }
            </InfiniteScroll >
        </div >
    )
        ;
}

export default PostPanel;
