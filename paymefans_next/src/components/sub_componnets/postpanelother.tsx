"use client"
import PostComponent, { UserMediaProps } from "../route_component/post_component";
import LoadingPost from "./loading_post";
import { formatDate } from "@/utils/format-date";
import { useEffect, useState } from "react";
import { fetchItemsOther } from "./infinite-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserAuthContext } from "@/lib/userUseContext";
import { ProfileUserProps } from "@/types/user";

type UserPostProps = {
    content: string;
    post_id: string;
    post_audience: string;
    post_likes: number;
    post_comments: number;
    post_shares: number;
    post_reposts: number;
    UserMedia: UserMediaProps[];
    user: {
        id: number;
        name: string;
        username: string;
        user_id: string;
        profile_image: string;
        Subscribers: {
            subscriber_id: number;
        }[]
    }
    created_at: Date;
}

const PostPanelOther = ({
    userdata
}: {
    userdata: ProfileUserProps
}) => {
    //allPosts will be used to store the news articles
    const { user } = useUserAuthContext();
    const [allPosts, setAllPosts] = useState<UserPostProps[]>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchMoreData = async () => {
        const res = await fetchItemsOther({ pageParam: page + 1, userid: userdata.id });
        setPage(page + 1);
        setAllPosts((prev) => {
            return [...prev, ...res?.data.data]
        });
        setTotalResults(res?.data.total);
    }

    useEffect(() => {
        async function fetchNews() {
            const res = await fetchItemsOther({ pageParam: page, userid: userdata.id });
            console.log(res?.data.data)
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
        <div className="mt-3 mb-12 select-none"
        >
            <InfiniteScroll
                dataLength={allPosts.length}
                next={fetchMoreData}
                hasMore={allPosts.length < totalResults}
                loader={<LoadingPost />}
                endMessage={<EndMessage />}
            >
                {userdata && allPosts?.map((post: UserPostProps, index: number) => (
                    <PostComponent key={index}
                        user={{ id: post.user.id, user_id: post.user.user_id, name: post.user.name, link: `/${post.user.username}`, username: post.user.username, image: post.user.profile_image }}
                        isSubscriber={post.user.Subscribers.some(sub => sub.subscriber_id === user?.id)}
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
    );
}

export default PostPanelOther;