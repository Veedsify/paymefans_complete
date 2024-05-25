import PostComponent from "../route_component/post_component";
import LoadingPost from "./loading_post";

const PostPanel = () => {
    return (
        <div className="py-8 mb-12 select-none">
            <PostComponent
                user={{ name: "Jenna", link: "/@jenna", username: "@jenna", image: "/images/user.png" }}
                data={{
                    post: "crafting is my passion and I love to make new things everyday. I hope you like my work. #crafting #art #handmade",
                    media: [{
                        type: "image",
                        url: "https://images.pexels.com/photos/2065203/pexels-photo-2065203.jpeg?auto=compress&cs=tinysrgb&w=400",
                    }, {
                        type: "video",
                        poster: "https://images.pexels.com/photos/20456867/pexels-photo-20456867/free-photo-of-a-couple-walking-along-the-water-near-a-bridge.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                        url: "https://videos.pexels.com/video-files/4820383/4820383-sd_540_960_25fps.mp4",
                    }, {
                        type: "image",
                        url: "https://images.pexels.com/photos/16176620/pexels-photo-16176620/free-photo-of-portrait-of-a-woman-with-curly-hair-against-orange-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                    }, {
                        type: "image",
                        url: "https://images.pexels.com/photos/20783567/pexels-photo-20783567/free-photo-of-a-man-in-a-grey-sweatshirt-and-jeans-standing-on-a-set-of-stairs.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    }],
                    time: "3h"
                }}
            />
            <PostComponent
                user={{ name: "Jenna", link: "/@jenna", username: "@jenna", image: "/images/user.png" }}
                data={{
                    post: "crafting is my passion and I love to make new things everyday. I hope you like my work. #crafting #art #handmade",
                    media: [{
                        type: "image",
                        url: "https://images.pexels.com/photos/14622910/pexels-photo-14622910.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                    }, {
                        type: "video",
                        poster: "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=400",
                        url: "https://videos.pexels.com/video-files/1943413/1943413-sd_640_360_24fps.mp4",
                    }],
                    time: "3h"
                }}
            />
        </div>
    );
}

export default PostPanel;