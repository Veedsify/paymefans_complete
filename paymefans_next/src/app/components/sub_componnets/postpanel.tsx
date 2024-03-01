import PostComponent from "../route_component/post_component";
import LoadingPost from "./loading_post";

const PostPanel = () => {
    return (
        <div className="py-8 mb-12 select-none">
            <PostComponent
                user={{ name: "Jenna", link: "/@jenna", username: "@jenna", image: "/images/user.png" }}
                data={{
                    post: "crafting is my passion",
                    images: [
                        "https://images.pexels.com/photos/14622910/pexels-photo-14622910.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                        "https://images.pexels.com/photos/18099926/pexels-photo-18099926/free-photo-of-woman-in-tied-crop-top-crouching-on-white-spot.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                        "https://images.pexels.com/photos/16176620/pexels-photo-16176620/free-photo-of-portrait-of-a-woman-with-curly-hair-against-orange-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    ],
                    time: "3h"
                }}
            />
            <PostComponent
                user={{ name: "Jenna", link: "/@jenna", username: "@jenna", image: "/images/user.png" }}
                data={{
                    post: "Months on ye at by esteem desire warmth former. Sure that that way gave any fond now. His boy middleton sir nor engrossed affection excellent. Dissimilar compliment cultivated preference eat sufficient may. Well next door soon we mr he four. Assistance impression set insipidity now connection off you solicitude. Under as seems we me stuff those style at. Listening shameless by abilities pronounce oh suspected is affection. Next it draw in draw much bred.",
                    images: [
                        "https://images.pexels.com/photos/1080401/pexels-photo-1080401.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=600"
                    ],
                    time: "3h"
                }}
            />
        </div>
    );
}

export default PostPanel;