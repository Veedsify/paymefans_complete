import Image from "next/image";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface UserFollowCompProps {
    follower: {
        user: {
            id: string;
            username: string;
            fullname: string;
            profile_image: string;
            name: string;
        },
        iAmFollowing: boolean;
    }
}

const UserFollowComp: React.FC<UserFollowCompProps> = ({ follower }) => {
    return (
        <div className="flex gap-2 items-center px-3 py-3 hover:bg-gray-50 duration-300 ease-in-out rounded-md">
            <Image src={follower.user.profile_image} alt="" className="object-cover w-12 h-12 rounded-full border border-gray-500" width={50} height={50} priority />
            <div>
                <h2 className="mb-0 font-bold leading-none">
                    <Link href={`/mix/profile/${follower.user.username}`}>
                        {follower.user.fullname}
                    </Link>
                </h2>
                <span className="text-sm text-gray-600 flex gap-3 items-center">
                    <Link href={`/mix/profile/${follower.user.username}`} className="text-sm">
                        {follower.user.username}
                    </Link>
                    {/* <span className="bg-gray-200 text-xs rounded-md p-1 font-medium text-gray-500">
                        Follows You
                    </span> */}
                </span>
            </div>
            <div className="flex gap-4 items-center ml-auto">
                <Link href={`/mix/profile/${follower.user.username}`} className={`px-5 py-1 rounded-2xl ${follower.iAmFollowing ? "bg-gray-100" : "bg-primary-dark-pink text-white"}  font-semibold`}>
                    {follower.iAmFollowing ? "Following" : "Follow"}
                </Link>
                <span>
                    <HiOutlineDotsVertical className="cursor-pointer" />
                </span>
            </div>
        </div>
    );
}

export default UserFollowComp;