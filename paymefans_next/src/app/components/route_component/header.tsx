import { LucideBellRing } from "lucide-react";
import HeaderTitle from "../sub_componnets/header_title";
import Image from "next/image";
import HeaderImgClick from "../sub_componnets/headerImgClick";
import getUserData from "@/app/utils/dataFetch/userdata";

const Header = async () => {
    const user = await getUserData();
    return (
        <header className="px-4 lg:px-8 py-3 border-b bg-primary-dark-pink lg:bg-white">
            <div className="flex items-center">
                <HeaderTitle />
                <Image width={200} height={40} src="/site/logo3.png" alt="" className="block lg:hidden h-auto w-auto" />
                <ul className="flex items-center gap-6 ml-auto lg:hidden">
                    <li>
                        <span>
                            <LucideBellRing stroke="#fff" />
                        </span>
                    </li>
                    <HeaderImgClick user={user} />
                </ul>
            </div>
        </header>
    );
}

export default Header;