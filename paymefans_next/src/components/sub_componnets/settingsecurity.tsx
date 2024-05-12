import { LucideChevronRight, LucideUserMinus2, LucideUsers } from "lucide-react";
import Link from "next/link";
import SettingsHookupCheck from "./settings-hookup-check";

const SettingSecurity = () => {
    return (
        <div className="py-5">
            <h1 className="font-bold mb-4">Privacy</h1>
            <div>
                <Link
                    className="flex gap-4 items-center border rounded-lg py-4 px-6 hover:bg-gray-100 transition-all duration-200 cursor-pointer mb-4" href="/mix/settings/followers">
                    <span>
                        <LucideUsers />
                    </span>
                    <span className="font-semibold" >
                        All Followers
                    </span>
                    <span className="ml-auto">
                        <LucideChevronRight />
                    </span>
                </Link>
                <div
                    className="flex gap-4 items-center border rounded-lg py-4 px-6 hover:bg-red-100 transition-all duration-200 cursor-pointer mb-4 text-red-500 border-red-300">
                    <span>
                        <LucideUserMinus2 />
                    </span>
                    <span className="font-semibold">
                        Blocked Users
                    </span>
                    <span className="ml-auto">
                        <LucideChevronRight />
                    </span>
                </div>
                <div>
                    <h2 className="mb-4 font-bold mt-10">
                        Change Password
                    </h2>
                </div>
                <div>
                    <input
                        type="password"
                        className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                        placeholder="Old Password "
                    /><input
                        type="npassword"
                        className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                        placeholder="New Password "
                    /><input
                        type="confirmNpassword"
                        className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                        placeholder="Re-enter new Password "
                    />
                    <input
                        type="submit"
                        value={"Update Password"}
                        className="w-full block border mb-3 bg-primary-dark-pink p-4 outline-none text-white rounded-xl cursor-pointer"
                    />
                </div>
                <SettingsHookupCheck />
                <div>
                    <h2 className="mb-4 font-bold mt-10">
                        Change Username
                    </h2>
                    <p>to change your account username, please visit the help section or contact support:&nbsp;
                        <a className="text-primary-dark-pink"
                            href="mailto:support@paymefans.com">support@paymefans.com</a>
                    </p>
                </div>
                <div>
                    <h2 className="mb-4 font-bold mt-10">
                        Delete Account
                    </h2>
                    <p>to delete your account please contact support:&nbsp;
                        <a className="text-primary-dark-pink"
                            href="mailto:support@paymefans.com">support@paymefans.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SettingSecurity;