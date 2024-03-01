"use client"
import { useSideBarContext } from "@/app/lib/pageContexts";
import { LucideSettings, LucideLogOut, LucideHelpCircle, LucideUser, LucideHeart, LucideAirplay, LucideStore, LucideMessageSquare, LucideUserPlus } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import swal from "sweetalert";
import { AuthUserProps } from "@/app/types/user";

interface SideBarProps {
  points: number | null;
  user: AuthUserProps | undefined;
}

const SideBar = ({
  points, user
}: SideBarProps) => {
  const { sideBarState, setSideBar } = useSideBarContext()
  const pathname = usePathname()
  useEffect(() => {
    const closeSideBar = () => {
      setSideBar(false)
    }
    closeSideBar()
  }, [pathname, setSideBar]);

  return (
    <>
      <div className={`lg:ml-auto bg-white h-screen lg:h-screen fixed lg:sticky top-0 overflow-auto smart-width p-4 z-50 shadow-xl lg:shadow-none lg:border-r duration-300 ease-in-out  ${sideBarState ? "left-0" : "-left-full"}`
      }>
        <div className="mt-8 mb-16 ">
          <Image className="block w-auto h-8" quality={100} width={150} height={30} priority src="/site/logo2.png" alt="" />
        </div>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Image
              width={50}
              height={50}
              priority
              src={user ? user.user.profile_image : "/site/banner.png"}
              className="object-cover w-12 h-12 rounded-full"
              alt=""
            />
            <div>
              <h2 className="mb-0 text-sm font-bold leading-none">
                {user?.user.name ? user.user.name : "Loading..."}
              </h2>
              <span className="text-sm text-gray-600">{user ? user.user.username : "Loading..."}</span>
            </div>
          </div>
          <div className="pt-5 mb-3">
            <h2 className="flex items-center mb-1 text-xl font-bold leading-none">{points ? points.toLocaleString("en-Us") : 0}
              <span className="ml-2">
                <Image width={20} height={20} src="/site/coin.svg" className="w-auto h-5 aspect-square" alt="" />
              </span>
            </h2>
            <span className="text-sm font-medium text-gray-600">Your Balance</span>
          </div>
          <div className="flex gap-3 pt-4 mb-5 ">
            <Link href="/mix/points" className="p-2 px-8 text-xs font-semibold text-white bg-black rounded">
              Add Funds
            </Link>
            <Link href="/mix/wallet" className="p-2 px-8 text-xs font-semibold text-black bg-white border border-gray-600 rounded">
              Wallet
            </Link>
          </div>
          <div className="pt-6">
            <Link href="/mix/profile" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideUser />
              <p>Profile</p>
            </Link>
            <Link href="/mix/live" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideAirplay />
              <p>Go Live</p>
            </Link>
            <Link href="/hookup" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideHeart />
              <p>Hook Up</p>
            </Link>
            <Link href="/mix/" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideStore />
              <p>Store</p>
            </Link>
            <Link href="/mix/messages" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideMessageSquare />
              <p>Messages</p>
            </Link>
            <Link href="/mix/models/benefits" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideUserPlus />
              <p>Become A Model</p>
            </Link>
            <hr className="mt-8 mb-8" />
            <Link href="/mix/" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideHelpCircle />
              <p>Help</p>
            </Link>
            <Link href="/mix/settings" className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl">
              <LucideSettings />
              <p>Settings & Privacy</p>
            </Link>
            <span className="flex items-center gap-5 p-2 mb-2 transition-all duration-200 hover:bg-gray-200 rounded-xl cursor-pointer select-none"
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "You are about to logout",
                  icon: "warning",
                  buttons: ["Cancel", "Logout"],
                  dangerMode: true,
                }).then((willLogout) => {
                  if (willLogout) {
                    signOut({ callbackUrl: "/login" })
                  }
                });
              }}
            >
              <LucideLogOut />
              <p>Logout</p>
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => setSideBar(false)}
        className={`lg:hidden block fixed inset-0 z-40 w-full bg-opacity-50 duration-300 ease-in-out bg-black ${sideBarState ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      </div>

    </>
  );
};

export default SideBar;
