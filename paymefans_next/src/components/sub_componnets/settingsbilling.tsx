import Image from "next/image";
import Toggle from "./checked";
import SubscriptionState from "./subscriptionState";
import { revalidatePath } from "next/cache";

const Settingsbilling = () => {
    return (
        <div className="py-5">
            <h1 className="font-bold mb-5">Set your message amount</h1>
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
        </div>
    );
}

export default Settingsbilling;