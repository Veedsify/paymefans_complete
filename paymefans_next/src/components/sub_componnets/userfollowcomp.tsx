import Image from "next/image";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";

const UserFollowComp = () => {
    return (
        <div className="flex gap-2 items-center px-3 py-3 hover:bg-gray-50 duration-300 ease-in-out rounded-md">
            <Image src="/images/register_image.png" alt="" className="object-cover w-12 h-12 rounded-full border border-gray-500" width={50} height={50} priority />
            <div>
                <h2 className="mb-0 font-bold leading-none">
                    <Link href="">
                        Tasha Banks
                    </Link>
                </h2>
                <span className="text-sm text-gray-600 flex gap-3 items-center">
                    <Link href="" className="text-sm">
                        @tashabanks
                    </Link>
                    <span className="bg-gray-200 text-xs rounded-md p-1 font-medium text-gray-500">
                        Follows You
                    </span>
                </span>
            </div>
            <div className="flex gap-4 items-center ml-auto">
                <Link href="" className="px-5 py-1 rounded-2xl bg-primary-dark-pink text-white font-semibold">
                    Unfollow
                </Link>
                <span>
                    <HiOutlineDotsVertical className="cursor-pointer"/>
                </span>
            </div>
        </div>
    );
}

export default UserFollowComp;