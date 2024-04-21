import UserNotFound from "@/components/route_component/usernotfound";
import FollowUserComponent from "@/components/sub_componnets/followUserComponent";
import ProfileTabs from "@/components/sub_componnets/profile_tabs";
import getUserProfile from "@/utils/data/profile-data";
import getUserData from "@/utils/data/user-data";

import {
    LucideCalendar,
    LucideLink,
    LucideLock,
    LucideMail,
    LucideMapPin,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Profile" + " | Paymefans",
    description: "Profile",
}

const ProfilePage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const user = await getUserData()
    const userdata = await getUserProfile({ user_id: id })
    if (!userdata) return <UserNotFound userid={id} />

    return (
        <>
            <div className="overflow-hidden">
                <Image
                    src={userdata?.profile_banner || "/site/banner.png"}
                    alt="Home Banner"
                    width={700}
                    height={400}
                    priority
                    className="inset-0 aspect-21-9 object-cover w-full h-full"
                />
                <div className="relative flex w-full px-2 md:px-5">
                    <Image
                        src={userdata?.profile_image || "/site/avatar.png"}
                        alt=""
                        priority
                        height={100}
                        width={100}
                        className="absolute object-cover md:w-24 md:h-24 w-20 h-20 sm:border-4 border-2 rounded-full md:-top-12  -top-6 border-primary-dark-pink "
                    />
                    <div className="flex items-center gap-3 sm:p-3 ml-auto p-3  ">
                        <FollowUserComponent thisuser={user} user={userdata} />
                        <button>
                            <p className="sm:px-4 py-1 px-2 text-sm font-semibold text-white bg-black border border-black rounded text-color">
                                Subscribe
                            </p>
                        </button>
                        <CreateConversationButton />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-2 mb-12 md:px-5">
                    <div className="flex flex-col ">
                        <h1 className="font-bold ">{userdata?.name}</h1>
                        <small className="text-gray-500 ">{userdata?.username}</small>
                    </div>
                    <p className="font-medium mb-2 leading-normal text-gray-700">
                        {userdata?.bio ? userdata?.bio : ""}
                    </p>
                    {userdata?.website && <>
                        <Link
                            href={userdata?.website ? userdata?.website : ""}
                            target="_blank"
                            className="font-medium text-primary-text-dark-pink text-sm mb-2 inline-block"
                        >
                            <LucideLink className="text-primary-text-dark-pink inline-block mr-2" size={18} />
                            {userdata?.website ? userdata?.website : ""}
                        </Link>
                    </>}
                    <div className="flex gap-3 flex-wrap text-sm items-center font-semibold text-gray-700 mb-2">
                        <span className="flex gap-2 items-center">
                            <LucideMapPin className="text-primary-text-dark-pink" size={18} />
                            <span>Lagos, {userdata?.location}</span>
                        </span>
                        {
                            userdata?.is_model ? (
                                <span className="flex items-center gap-2">
                                    <LucideLock className="text-primary-text-dark-pink" size={18} />
                                    <span>Model</span>
                                </span>
                            ) : ""
                        }
                        <span className="flex items-center gap-2">
                            <LucideCalendar className="text-primary-text-dark-pink" size={18} />
                            <span>Joined {
                                userdata?.created_at ? new Date(userdata?.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""
                            }</span>
                        </span>
                    </div>

                    <div className="flex gap-2 mb-3  flex-wrap sm:text-base text-sm">
                        <span className="flex gap-2 items-center">
                            <h1 className="font-bold text-sm">2.3K</h1>
                            <p className="font-medium text-gray-500 text-sm">Followers</p>
                        </span>
                        <span className="flex gap-2 items-center">
                            <h1 className="font-bold text-sm">38.9K</h1>
                            <p className="font-medium text-gray-500 text-sm">Following</p>
                        </span>
                        <span className="flex gap-2 items-center ">
                            <h1 className="font-bold text-sm">13.3K</h1>
                            <p className="font-medium text-gray-500 text-sm">Subscribers</p>
                        </span>
                    </div>
                </div>
            </div>
            <ProfileTabs />
        </>
    );
}


function CreateConversationButton() {
    // Add a new conversation context here to check if the urrecnt user has a conversation with the user  and if not create a new conversation
    return (
        <Link
            href="/mix/chats/1"
            className="p-1 text-white rounded bg-primary-dark-pink"
        >
            <LucideMail className="w-5 h-5" />
        </Link>
    );
}


export default ProfilePage;