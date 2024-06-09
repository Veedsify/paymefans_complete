import PostComponent from "@/components/route_component/post_component";
import StatusComponent from "@/components/route_component/status";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Paymefans",
    description: "This is the home page",
    keywords: "home, page, website",
}

export default function Home() {
    return (
        <>
            <StatusComponent />
            <div className="p-4">
                <PostComponent
                    user={{ id: 1, name: "Jenna", link: "/@jenna", username: "@jenna", image: "/images/user.png" }}
                    data={{
                        post_id: "1",
                        post_audience: "public",
                        post: "crafting is my passion and I love to make new things everyday. I hope you like my work. #crafting #art #handmade",
                        media: [{
                            type: "image",
                            url: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=400",
                        }, {
                            type: "video",
                            poster: "https://images.pexels.com/photos/246367/pexels-photo-246367.jpeg?auto=compress&cs=tinysrgb&w=400",
                            url: "https://videos.pexels.com/video-files/8760156/8760156-sd_640_360_30fps.mp4",
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
