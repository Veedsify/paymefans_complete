"use client"
import { useState } from "react";

const Toggle = () => {
    const [isChecked, setIsChecked] = useState(false);
    const newId = Math.random().toString(36).substring(7);
    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleSwitch}
                id={newId}
                className="hidden"
            />
            <label
                htmlFor={newId}
                className="flex items-center cursor-pointer  duration-300"
            >
                <div className="relative">
                    <div className={`w-12 h-7 flex items-center border rounded-full shadow-inner ${isChecked
                        ? "bg-primary-dark-pink "
                        : ""
                        }transition-transform duration-300`}>

                        <div
                            className={` w-[18px] h-[18px]  bg-gray-200 ml-1 rounded-full insect-y-0 left-0 ${isChecked
                                ? "transform translate-x-full "
                                : ""
                                }transition-transform duration-300`}
                        ></div>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default Toggle;