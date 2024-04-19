"use client"
import { countries } from "@/lib/locations";
import { modelSignUp } from "@/utils/data/model-signup";
import { LucideChevronDown, LucideChevronUp, LucideEye, LucideUser, LucideUser2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, LegacyRef, MouseEvent, MutableRefObject, useRef, useState } from 'react';
import toast from "react-hot-toast";
import swal from "sweetalert";

type postAudienceDataProps = {
    id?: number;
    name?: string;
    icon?: JSX.Element;
}

const postAudienceData: postAudienceDataProps[] = [{
    id: 1,
    name: "Male",
    icon: <LucideUser size={20} className="inline" />
},
{
    id: 2,
    name: "Female",
    icon: <LucideUser2 size={20} className="inline" />
}]

interface ModelSignUpProps {
    firstname?: string;
    lastname?: string;
    dob?: string;
    country?: string;
    available?: string;
    audience?: string;
}

const BecomeAModel = () => {
    const router = useRouter()
    const [modelSignUpdata, setModelSignUpData] = useState<ModelSignUpProps>({})
    const [dropdown, setDropdown] = useState(false);
    const [postAudience, setPostAudience] = useState<postAudienceDataProps>({
        name: "Choose Gender",
    });
    const ref = useRef()

    const updatePostAudience = (e: MouseEvent<HTMLLIElement>) => {
        const id = e.currentTarget.getAttribute("data-id");
        const audience = postAudienceData.find((audience) => audience.id === Number(id)) as postAudienceDataProps;
        setPostAudience(audience);
        setDropdown(false);
    }

    const updateModelSignUpData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setModelSignUpData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const submitData = async (e: MouseEvent<HTMLButtonElement>) => {
        if (!modelSignUpdata.firstname) return toast.error("Please insert a firstname")
        if (!modelSignUpdata.lastname) return toast.error("Please insert a lastname")
        if (!modelSignUpdata.dob) return toast.error("Please insert a date ")
        if (postAudience.name === "Choose Gender") return toast.error("Please select a gender")
        if (!modelSignUpdata.country) return toast.error("Please select a country ")
        if (!modelSignUpdata.available) return toast.error("Please select a if you'd be available for hookup ")

        const loadingToast = toast.loading("Signing you up, please wait...")
        const res = await modelSignUp({
            ...modelSignUpdata,
            gender: postAudience.name?.toLocaleLowerCase()
        })

        if (res && res.status === true) {
            console.log(res)
            window.location.href = res.url
            router.refresh()
        } else {
            toast.dismiss(loadingToast)
            swal({
                icon: "error",
                title: "Error",
                text: res.message
            })
        }
    }


    return (
        <div className="px-4 py-6 ">
            <h1 className="text-lg md:hidden block font-bold">Become a Model</h1>
            <div>
                <div>
                    <input
                        onChange={updateModelSignUpData}
                        type="text" placeholder="First name" name="firstname"
                        className="border mt-2 p-4 w-full rounded-lg pl-5 font-semibold outline-none" />
                </div>
                <div>
                    <input
                        onChange={updateModelSignUpData}
                        type="text" placeholder="Last name" name="lastname"
                        className="border p-4 mt-4 w-full rounded-lg pl-5 font-semibold outline-none" />
                </div>
                <div>
                    <input
                        onChange={updateModelSignUpData}
                        type="date" placeholder="Date of Birth" name="dob"
                        className="border p-4 mt-4 w-full rounded-lg pl-5 font-semibold outline-none" />
                </div>
                <button className="border p-4 mt-4  rounded-lg pl-5  outline-none  relative w-full">
                    <span className="flex gap-2 items-center text-sm font-semibold "
                        onClick={() => setDropdown(!dropdown)} data-gender={postAudience.name}
                    >
                        {postAudience.icon} {postAudience.name}
                        {dropdown ? (<LucideChevronUp size={20} className="ml-auto" />) : (
                            <LucideChevronDown size={20} className="ml-auto" />)}
                    </span>
                    <div
                        className={`absolute w-full left-0 mt-3 transition-all duration-300 ${dropdown ? "opacity-100 -translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
                        <ul className="bg-white rounded-xl mt-2 shadow-md text-left w-full">
                            {
                                postAudienceData.map((audience) => (
                                    <li key={audience.id}
                                        data-id={audience.id}
                                        onClick={updatePostAudience}
                                        className="p-2 text-xs flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-100">
                                        {audience.icon}
                                        {audience.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </button>
                <div>
                    <select onChange={updateModelSignUpData} defaultValue="1"
                        className="border p-4 mt-4 w-full rounded-lg pl-5 font-semibold outline-none"
                        name="country">
                        <option value={1} disabled>
                            (--- Select Country ---)
                        </option>
                        {countries.map((location) => (
                            <option value={location.code ? location.name : ""}
                                key={location.code}>{location.name}</option>
                        ))}
                        <option value="uk">UK</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 px">
                <p>Are you available for Hookup?</p>
                <label className="inline-flex cursor-pointer mt-3 items-center font-medium gap-2 text-gray-500"
                    htmlFor="yes">
                    <input onChange={updateModelSignUpData} type="radio" name="available" id="yes" value="yes"
                        className="accent-primary-dark-pink h-6 w-6 outline-none" />
                    Yes
                </label>
                <label className="inline-flex cursor-pointer items-center font-medium gap-2 ml-4 text-gray-500"
                    htmlFor="no">
                    <input onChange={updateModelSignUpData} type="radio" name="available" value="no" id="no"
                        className="accent-primary-dark-pink h-6 w-6 outline-none" />
                    No
                    <label></label>
                </label>
            </div>
            <p className=" mt-5 ">Pay a one time membership fee of <b>₦5,000 </b></p>
            <button onClick={submitData}
                className="bg-primary-dark-pink w-full p-3 rounded-xl mt-3 mb-20 text-white font-semibold">SUBMIT &
                Pay
            </button>
        </div>
    );
}


export default BecomeAModel;