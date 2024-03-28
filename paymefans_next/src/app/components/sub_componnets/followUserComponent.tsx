"use client";
import { AuthUserProps } from "@/app/types/user";
import { useEffect, useState } from "react";

type FollowUserProps = {
    thisuser: AuthUserProps;
    user: AuthUserProps;
}
const FollowUserComponent: React.FC<FollowUserProps> = ({ user, thisuser }) => {
    const [following, setFollowing] = useState(false);
    useEffect(() => {
        const checkIfFollowing = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/follow/check`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.user_id,
                    followerId: thisuser.user_id
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
                },
            });
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setFollowing(data.status);

            }
        }

        checkIfFollowing()
    }, [])
    return (
        <button>
            <p className="sm:px-4 py-1 px-2  text-sm font-semibold border border-black rounded font text-color ">
                {following ? "Unfollow" : "Follow"}
            </p>
        </button>
    );
}

export default FollowUserComponent;