"use client"
import { useSideBarContext } from "@/app/lib/pageContexts";
import { AuthUserProps } from "@/app/types/user";
import Image from "next/image";
type HeaderImgProps = {
    user: AuthUserProps | undefined
}
const HeaderImgClick: React.FC<HeaderImgProps> = ({ user }) => {
    const { setSideBar } = useSideBarContext()

    return (
        <li>
            <span
                className="block w-12 h-12 border-2 border-white rounded-full cursor-pointer"
                onClick={() => setSideBar(true)}
            >
                <Image width={50} height={50} priority src={user ? user.user.profile_image : ""} alt="" className="w-full h-full object-cover rounded-full" />
            </span>
        </li>
    );
}

export default HeaderImgClick;