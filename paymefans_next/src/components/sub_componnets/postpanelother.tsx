"use client"
import PostComponent, { UserMediaProps } from "../route_component/post_component";
import LoadingPost from "./loading_post";
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
    media: UserMediaProps[];
    user: {
        id: number;
        name: string;
        username: string;
        user_id: string;
        profile_image: string;
    }
    created_at: Date;
}

const PostPanelOther = ({
    userdata
}: {
    userdata: any
}) => {
    const { data, isLoading, error, isFetched } = useQuery({
        queryKey: ["user-posts", { pageParam: 1, userid: userdata.id }],
        queryFn: async () => await getUserPosts({ pageParam: 1, userid: userdata.id }),
    })


    return (
        <div className="py-6 mt-3 mb-12 select-none"
        >
            {isFetched && data.data.map((post: UserPostProps, index: number) => (
                <PostComponent key={index}
                    user={{ id: post.user.id, name: post.user.name, link: `/profile/${post.user.username}`, username: post.user.username, image: post.user.profile_image }}
                    data={{
                        ...post,
                        post: post.content,
                        media: post.media,
                        time: formatDate(new Date(post.created_at))
                    }}
                />
            ))}
            {isLoading && <LoadingPost />}
            {isFetched && data.data.length == 0 && <p className="text-center">No post found</p>}
        </div>
    );
}

export default PostPanelOther;