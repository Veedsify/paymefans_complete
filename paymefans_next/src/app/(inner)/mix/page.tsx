import PostComponent from "@/components/route_component/post_component";
import StatusComponent from "@/components/route_component/status";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "This is the home page",
    keywords: "home, page, website",
}   

export default function Home() {
    return (
        <>
            <StatusComponent/>
            <div className="p-4">
                <PostComponent
                    user={{name: "Jenna", link: "/@jenna", username: "@jenna", image: "/images/user.png"}}
                    data={{
                        post: "crafting is my passion and I love to make new things everyday. I hope you like my work. #crafting #art #handmade",
                        medias: [{
                            type: "image",
                            url: "https://images.pexels.com/photos/14622910/pexels-photo-14622910.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                        }, {
                            type: "video",
                            poster: "https://images.pexels.com/photos/20456867/pexels-photo-20456867/free-photo-of-a-couple-walking-along-the-water-near-a-bridge.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                            url: "https://videos.pexels.com/video-files/6060027/6060027-sd_540_960_25fps.mp4",
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
            </div>
        </>
    );
}
