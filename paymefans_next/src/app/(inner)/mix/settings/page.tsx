import Toggle from "@/app/components/sub_componnets/checked";
import SubscriptionState from "@/app/components/sub_componnets/subscriptionState";
import Image from "next/image";
const Settings = () => {

    return (
        <div className="p-4 lg:mb-4 mb-20">
            <div className="border-[3px] mb-3 inline-block p-2 rounded-full border-dotted">
                <Image
                    src="/images/login_image.png"
                    alt=""
                    width={100}
                    priority
                    height={100}
                    className="object-cover w-20 h-20 rounded-full lg:w-24 lg:h-24 aspect-square "
                />
            </div>

            {/* <form onSubmit={(e) => e.preventDefault()} action=""> */}
            <div>
                <input
                    type="text"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Name "
                />
            </div>
            <div>
                <input
                    type="text"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Location "
                />
            </div>
            <div>
                <input
                    type="email"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Email "
                />
            </div>
            <div>
                <textarea
                    name=""
                    id=""
                    rows={6}
                    className="resize-none w-full block outline-none border mb-3 border-gray-300 p-4 text-black rounded-xl"
                    placeholder="Bio"
                ></textarea>
            </div>
            <div>
                <input
                    type="text"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Website "
                />
            </div>
            <h1 className="font-bold mb-2">Set your message amount</h1>
            <div className="w-full border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl flex gap-2 ">
                <div className="flex gap-2 w-full">
                    <Image width={30} height={30} src="/site/coin.svg" alt="" />
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full outline-none font-bold text-gray-700"
                    />
                </div>
                <h2 className="text-primary-dark-pink font-bold">₦0</h2>
            </div>

            <span className="inline-flex gap-2 my-4">
                <Toggle />
                Enable free message
            </span>

            <SubscriptionState />
            <button className="text-center text-white bg-primary-dark-pink w-full p-4 rounded-xl">
                SAVE
            </button>
            {/* </form> */}
        </div>
    );
};

export default Settings;
