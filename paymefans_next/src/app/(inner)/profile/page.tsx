import BannerComponent from "@/components/lib_components/banner_component";
import EditProfileButton from "@/components/sub_componnets/editprofileButton";
import ProfileTabs from "@/components/sub_componnets/profile_tabs";
import { AuthUserProps } from "@/types/user";
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
    title: "Profile",
    description: "Profile page",
};

const ProfilePage = async () => {
    const user: AuthUserProps | null = await getUserData()
    return (
        <>
            <div className="overflow-hidden">
                <BannerComponent profile_banner={user ? user.profile_banner : "/site/banner.png"} />
                <div className="relative flex w-full px-2 md:px-5">
                    <Image
                        src={user ? user.profile_image : "/site/avatar.png"}
                        alt="proile image"
                        height={100}
                        width={100}
                        className="absolute object-cover md:w-24 md:h-24 w-20 h-20 sm:border-4 border-2 rounded-full md:-top-12  -top-6 border-primary-dark-pink "
                    />
                    <div className="flex items-center gap-3 sm:p-3 ml-auto p-3  ">
                        <EditProfileButton user={user} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-2 mb-12 md:px-5 items-start">
                    <div className="flex flex-col ">
                        <h1 className="font-bold ">{user?.name ? user.name : ""}</h1>
                        <small className="text-gray-500 ">{user?.username}</small>
                    </div>
                    <p className="font-medium mb-2 leading-normal text-gray-700">
                        {user?.bio ? user.bio : ""}
                    </p>
                    {user?.website && <>
                        <Link
                            href={user.website ? user.website : ""}
                            target="_blank"
                            className="font-medium text-primary-text-dark-pink text-sm mb-2 inline-block"
                        >
                            <LucideLink className="text-primary-text-dark-pink inline-block mr-2" size={18} />
                            {user.website ? user.website : ""}
                        </Link>
                    </>}
                    <div className="flex gap-3 flex-wrap text-sm items-center font-semibold text-gray-700 mb-2">
                        <span className="flex gap-2 items-center">
                            <LucideMapPin className="text-primary-text-dark-pink" size={18} />
                            <span>{user && user.state ? user.state + "," : ""} {user?.location}</span>
                        </span>
                        {
                            user?.is_model ? (
                                <span className="flex items-center gap-2">
                                    <LucideLock className="text-primary-text-dark-pink" size={18} />
                                    <span>Model</span>
                                </span>
                            ) : ""
                        }
                        <span className="flex items-center gap-2">
                            <LucideCalendar className="text-primary-text-dark-pink" size={18} />
                            <span>Joined {
                                user?.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""
                            }</span>
                        </span>
                    </div>

                    <div className="flex gap-2 mb-3  flex-wrap sm:text-base text-sm">
                        <span className="flex gap-2 items-center">
                            <h1 className="font-bold text-sm">{
                                formatNumber(user?.total_followers)
                            }</h1>
                            <p className="font-medium text-gray-500 text-sm">Followers</p>
                        </span>
                        <span className="flex gap-2 items-center">
                            <h1 className="font-bold text-sm">{formatNumber(user?.total_following)}</h1>
                            <p className="font-medium text-gray-500 text-sm">Following</p>
                        </span>
                        <span className="flex gap-2 items-center ">
                            <h1 className="font-bold text-sm">
                                {
                                    formatNumber(user?._count.Subscribers)
                                }
                            </h1>
                            <p className="font-medium text-gray-500 text-sm">Subscribers</p>
                        </span>
                    </div>
                </div >
            </div >
            <ProfileTabs />
        </>
    );

    function formatNumber(number: any): string {
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(1) + "B";
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + "M";
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + "K";
        } else {
            return number.toString();
        }
    }
}

export default ProfilePage;