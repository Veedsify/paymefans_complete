"use client"

import { useState } from "react";

const FollowButton = ({ status }: { status: boolean }) => {
    const [followStatus, setFollowStatus] = useState<boolean>(status)
    const followProfile = () => {
        setFollowStatus(!followStatus)
    }
    return (
        <button
            onClick={followProfile}
            className="sm:px-4 py-1 px-2  text-sm font-semibold border border-black rounded font text-color ">
            {followStatus ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowButton;