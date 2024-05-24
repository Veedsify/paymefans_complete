"use client"

import { useRef, useEffect, useState } from "react";
import UserFollowComp from "../sub_componnets/userfollowcomp";

interface PaginateProps {
    min: number;
    max: number;
}

interface Followers {
    id: string;
    username: string;
    profile_image: string;
    name: string;
}

const FollowersDisplay = () => {
    const [paginate, setPaginate] = useState<PaginateProps>({
        min: 1,
        max: 30
    });
    const [followers, setFollowers] = useState<Followers[]>([]);

    const ref = useRef<HTMLDivElement>(null);
    // create a fake 300 length array
    const arr = new Array(50).fill(0);

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("scroll", () => {
                if (ref.current) {
                    if (
                        ref.current.scrollTop + ref.current.clientHeight >=
                        ref.current.scrollHeight
                    ) {
                        setPaginate({
                            min: Number(paginate.min) + 30,
                            max: Number(paginate.max) + 30
                        })
                    }
                }
            });
        }
    }, [paginate]);

    useEffect(() => {
        if (paginate.min > 1) {
            fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/profile/followers?min=${paginate.min}&max=${paginate.max}`)
                .then((res) => res.json())
                .then((data) => {
                    setFollowers([...followers, ...data.results]);
                }).catch((err) => {
                    console.log(err);
                })
        }

    }, [paginate, followers, setFollowers]);

    return (
        <div
            className="p-2 md:p-4 md:pt-6 overflow-y-auto max-h-[92vh]"
            ref={ref}
        >
            {arr.map((model, i) => (
                <UserFollowComp key={i} />
            ))}
        </div>
    )
}

export default FollowersDisplay;