"use client"
import { UserUpdateProfileType } from "@/types/user";
import axios from "axios";
import { Facebook, Instagram, LucideCamera, LucideInstagram, Twitter, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditProfileButton = ({ user }: { user: any }) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null)
    const [userData, setUserData] = useState<UserUpdateProfileType>({} as UserUpdateProfileType)
    const router = useRouter()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setFile(e.currentTarget.files?.[0])
            setUserData({ ...userData, profile_image: e.currentTarget.files?.[0] })
        }
    }

    const handleSaveClick = async () => {
        const formData = new FormData()
        for (const key in userData) {
            if (Object.prototype.hasOwnProperty.call(userData, key)) {
                const value = userData[key as keyof UserUpdateProfileType] as string | File;
                formData.append(key, value);
            }
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/profile/image/change`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`
                }
            })

            if (response.status === 200 && response.data) {
                setOpen(false)
                toast.success('Profile updated successfully');
                router.refresh()
            } else {
                return toast.error('Failed to update profile')
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [open])
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="sm:px-4 py-1 px-2 text-sm font-semibold text-white bg-black border border-black rounded text-color">
                Edit Profile
            </button>
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 w-full h-full bg-white z-50 flex items-center justify-center transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"}`}>
                <span
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => setOpen(false)}>
                    <X />
                </span>
                <div className="bg-white p-5 rounded-md shadow-lg md:min-w-[550px] max-h-[600px] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="font-bold text-lg md:text-xl mb-5">Edit Profile</h1>
                    <label htmlFor="imageUpload">
                        <div className="relative border-[3px] mb-3 inline-block p-2 rounded-full border-dotted group">
                            <Image
                                src={file ? URL.createObjectURL(file) : user?.profile_image || "/site/avatar.png"}
                                alt=""
                                width={100}
                                priority
                                height={100}
                                className="object-cover w-20 h-20 rounded-full lg:w-24 lg:h-24 aspect-square "
                            />
                            <div className="opacity-0 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer group-hover:opacity-100 transition-all duration-200">
                                <LucideCamera size={30} className="text-white" />
                            </div>
                        </div>
                    </label>
                    <input
                        onChange={handleFileChange}
                        type="file" id="imageUpload" className="hidden" />

                    {/* <form onSubmit={(e) => e.preventDefault()} action=""> */}
                    <div>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="name"
                            defaultValue={user?.name}
                            className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                            placeholder="Name "
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="location"
                            className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                            defaultValue={user?.location ? user?.location : ""}
                            placeholder="Location "
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            defaultValue={user?.email ? user?.email : ""}
                            className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl select-none"
                            readOnly
                            disabled
                            placeholder="Email "
                        />
                    </div>
                    <div>
                        <textarea
                            name="bio"
                            id=""
                            rows={6}
                            onChange={handleInputChange}
                            className="resize-none w-full block outline-none border mb-3 border-gray-300 p-4 text-black rounded-xl"
                            placeholder="Bio"
                            defaultValue={user?.bio ? user?.bio : ""}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="website"
                            defaultValue={user?.website ? user?.website : ""}
                            className="w-full block border mb-5 border-gray-300 p-4 outline-none text-black rounded-xl"
                            placeholder="Website"
                        />
                    </div>
                    <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5">
                        <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                            <Instagram />
                        </div>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="instagram"
                            className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                            placeholder="https://instagram.com/@paymefans"
                        />
                    </div>
                    <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5">
                        <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                            <Twitter />
                        </div>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="twitter"
                            className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                            placeholder="https://twitter.com/@paymefans"
                        />
                    </div>
                    <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5">
                        <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                            <Facebook />
                        </div>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="facebook"
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
                            placeholder="Website "
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EditProfileButton;