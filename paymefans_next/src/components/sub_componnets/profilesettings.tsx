"use client"
import { Facebook, Instagram, Twitter } from "lucide-react";
import { UserUpdateProfileType } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveUserSettings } from "@/utils/data/save-user-settings";

type ProfileSettingsProps = {
    user: any
}

const ProfileSettings = ({
    user
}: ProfileSettingsProps) => {
    const router = useRouter()
    const [userData, setUserData] = useState<UserUpdateProfileType>({} as UserUpdateProfileType)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleSaveClick = async () => {
        try {
            const response = await saveUserSettings(userData)
            if (response.ok) {
                toast.success('Profile updated successfully');
                router.refresh()
            } else {
                return toast.error('Failed to update profile')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="py-5">
            <h1 className="font-bold mb-4">Update Profile Settings</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    defaultValue={user?.name}
                    onChange={handleInputChange}
                    placeholder="Name "
                />
            </div>
            <div>
                <input
                    type="text"
                    name="location"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    defaultValue={user?.location}
                    onChange={handleInputChange}
                    placeholder="Location "
                />
            </div>
            <div>
                <input
                    type="email"
                    disabled
                    defaultValue={user?.email}
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Email "
                />
            </div>
            <div>
                <textarea
                    name="bio"
                    rows={6}
                    className="resize-none w-full block outline-none border mb-3 border-gray-300 p-4 text-black rounded-xl"
                    placeholder="Bio"
                    onChange={handleInputChange}
                    defaultValue={user?.bio ? user.bio : ""}
                ></textarea>
            </div>
            <div>
                <input
                    type="text"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Website "
                    name="website"
                    onChange={handleInputChange}
                    defaultValue={user?.website ? user.website : ""}
                />
            </div>
            <div>
                <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5 overflow-hidden">
                    <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                        <Instagram />
                    </div>
                    <input
                        type="text"
                        name="instagram"
                        onChange={handleInputChange}
                        className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                        placeholder="https://instagram.com/@paymefans"
                    />
                </div>
                <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5 overflow-hidden">
                    <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                        <Twitter />
                    </div>
                    <input
                        type="text"
                        name="twitter"
                        onChange={handleInputChange}
                        className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                        placeholder="https://twitter.com/@paymefans"
                    />
                </div>
                <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5 overflow-hidden">
                    <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                        <Facebook />
                    </div>
                    <input
                        type="text"
                        name="facebook"
                        onChange={handleInputChange}
                        className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                        placeholder="https://facebook.com/@paymefans"
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        onClick={handleSaveClick}
                        defaultValue={"Save"}
                        className="w-full block border mb-3 bg-primary-dark-pink p-4 outline-none text-white rounded-xl cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;