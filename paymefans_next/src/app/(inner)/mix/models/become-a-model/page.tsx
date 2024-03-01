"use client"
import { LucideChevronDown, LucideChevronUp, LucideEye, LucideUser2 } from "lucide-react";
import { MouseEvent, useState } from 'react';

type postAudienceDataProps = {
    id?: number;
    name?: string;
    icon?: JSX.Element;
}

const postAudienceData: postAudienceDataProps[] = [{
    id: 1,
    name: "Male",
    icon: <LucideEye size={20} className="inline" />
},
{
    id: 2,
    name: "Female",
    icon: <LucideUser2 size={20} className="inline" />
}]
const BecomeAModel = () => {

    const [dropdown, setDropdown] = useState(false);
    const [postAudience, setPostAudience] = useState<postAudienceDataProps>({
        name: "Choose Gender",

    });
    const updatePostAudience = (e: MouseEvent<HTMLLIElement>) => {
        const id = e.currentTarget.getAttribute("data-id");
        const audience = postAudienceData.find((audience) => audience.id === Number(id)) as postAudienceDataProps;
        setPostAudience(audience);
        setDropdown(false);
    }


    return (
        <div className="px-4 py-6 ">
            <h1 className="text-lg md:hidden block font-bold">Become a Model</h1>
            <div>
                <input type="text" placeholder="First name" className="border mt-2 p-4 w-full rounded-lg pl-5 font-semibold outline-none" />
                <input type="text" placeholder="Last name" className="border p-4 mt-4 w-full rounded-lg pl-5 font-semibold outline-none" />
                <input type="date" placeholder="Date of Birth" className="border p-4 mt-4 w-full rounded-lg pl-5 font-semibold outline-none" />
                <button className="border p-4 mt-4  rounded-lg pl-5  outline-none  relative w-full">
                    <span className="flex gap-2 items-center text-sm font-semibold  "
                        onClick={() => setDropdown(!dropdown)}
                    >
                        {postAudience.icon} {postAudience.name}
                        {dropdown ? (<LucideChevronUp size={20} className="ml-auto" />) : (<LucideChevronDown size={20} className="ml-auto" />)}
                    </span>
                    <div className={`absolute w-full left-0 mt-2 transition-all duration-300 ${dropdown ? "opacity-100 -translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                        <ul className="bg-white rounded-xl mt-2 shadow-md text-left w-full">
                            {
                                postAudienceData.map((audience) => (
                                    <li key={audience.id}
                                        data-id={audience.id}
                                        onClick={updatePostAudience} className="p-2 text-xs flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-100">
                                        {audience.icon}
                                        {audience.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </button>
                <input type="text" placeholder="Choose Country" className="border p-4 mt-4 w-full rounded-lg pl-5 font-semibold outline-none" />
            </div>
            <div className="mt-4 px">

                <p >Are you available for Hookup?</p>
                <label className="inline-flex mt-3 items-center font-medium gap-2 text-gray-500" htmlFor="yes">
                    <input type="checkbox" id="yes" className="accent-primary-dark-pink outline-none" />
                    Yes
                </label>
                <label className="inline-flex items-center font-medium gap-2 ml-4 text-gray-500" htmlFor="no" >
                    <input type="checkbox" id="no" className="accent-primary-dark-pink outline-none" />
                    No
                    <label ></label>
                </label>
            </div>
            <p className=" mt-5 ">Pay a one time membership fee of <b>₦5,000 </b> </p>

            <button className="bg-primary-dark-pink w-full p-3 rounded-xl mt-3 mb-20 text-white font-semibold">SUBMIT & Pay</button>
        </div>
    );
}


export default BecomeAModel;