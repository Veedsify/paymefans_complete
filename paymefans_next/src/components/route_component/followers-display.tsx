"use client"

import { useRef, useEffect, useState, useCallback } from "react";
import UserFollowComp from "../sub_componnets/userfollowcomp";
import { getToken } from "@/utils/cookie.get";

interface PaginateProps {
    min: number;
    max: number;
}

export interface Followers {
    user: {
        id: string;
        username: string;
        fullname: string;
        profile_image: string;
        name: string;
    },
    iAmFollowing: boolean;
}

const FollowersDisplay = () => {
    const [paginate, setPaginate] = useState<PaginateProps>({
        min: 1,
        max: 30
    });
    const [followers, setFollowers] = useState<Followers[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const token = getToken()
    const arr = new Array(30).fill(0);
    const fetchFollowers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/get/followers?min=${paginate.min}&max=${paginate.max}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setFollowers((prev) => {
                const remaining = data.followers.filter((follower: Followers) => {
                    // If the follower's id isn't found in the existing followers list, keep it
                    return !prev.some(f => f.user.id === follower.user.id);
                });
                return [...prev, ...remaining];
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchFollowers();
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                if ((ref.current.scrollTop + ref.current.clientHeight) + 100 >= ref.current.scrollHeight) {
                    setPaginate(prevPaginate => ({
                        min: prevPaginate.min + 30,
                        max: prevPaginate.max + 30
                    }));
                }
            }
        };

        if (ref.current) {
            ref.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [paginate]); // Include paginate in the dependency array

    useEffect(() => {
        fetchFollowers();
    }, [paginate]); // Fetch followers whenever paginate changes


    return (
        <div
            className="p-2 md:p-4 overflow-y-auto max-h-[92vh]"
            ref={ref}
        >
            {followers.map((follower, index) => (
                <UserFollowComp key={index} follower={follower} />
            ))}
        </div>
    )
}

export default FollowersDisplay;